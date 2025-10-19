package com.hunre.it.webstudyonline.service;


import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.map.IMap;
import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.RoleEntity;
import com.hunre.it.webstudyonline.mapper.AuthMapper;
import com.hunre.it.webstudyonline.model.dto.auth.*;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.RoleRepository;
import com.hunre.it.webstudyonline.utils.Constant;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class AuthService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AuthMapper authMapper;
    @Autowired
    private IEmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    @Qualifier("hazelcastServerInstance")
    private HazelcastInstance hazelcastInstance;

    @Override
    public BaseResponse<SignUpUserDto> signup(SignUpUserDto signUpUserDto) {
        BaseResponse<SignUpUserDto> response  = new BaseResponse<>();
        String verificationCode = generateVerificationCode();

        IMap<String, VerifyingUserDto> otpMap = hazelcastInstance.getMap("otpCodes");
        otpMap.put(signUpUserDto.getEmail(), new VerifyingUserDto(verificationCode, signUpUserDto), 60, TimeUnit.SECONDS);

        try {
            sendVerificationEmail(signUpUserDto.getEmail(), verificationCode);
            response.setData(signUpUserDto);
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send verification email", e);
        }

        return response;
    }

    @Override
    public AccountEntity authenticate(LoginUserDto loginUserDto) {
        AccountEntity user = accountRepository.findByEmail(loginUserDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified. Please verify your account.");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserDto.getEmail(),
                        loginUserDto.getPassword()
                )
        );
        return user;
    }

    @Override
    public void verifyUser(VerifyUserDto verifyUserDto) {
        IMap<String, VerifyingUserDto> otpMap = hazelcastInstance.getMap("otpCodes");

        VerifyingUserDto verifying = otpMap.get(verifyUserDto.getEmail());

        if (verifying == null || !verifying.getVerificationCode().equals(verifyUserDto.getVerificationCode())) {
            throw new RuntimeException("Invalid or expired verification code");
        }

        otpMap.remove(verifyUserDto.getEmail());

        SignUpUserDto signedUpUser = verifying.getUserDto();

        AccountEntity account = new AccountEntity(
            "UID"+ ZonedDateTime.now().getYear() + 00001,
            signedUpUser.getFullname(),
            passwordEncoder.encode(signedUpUser.getPassword()),
            signedUpUser.getEmail(),
            signedUpUser.getPhone()
        );
        account.setEnabled(false);
        account.setDeleted(false);

        // Make created user have role USER by default.
        Set<RoleEntity> roles = roleRepository.findByCode("USER").stream().collect(Collectors.toSet());

        account.setRoles(roles);
        account.setEnabled(true);
        accountRepository.save(account);
    }

    @Override
    public void resendVerificationCode(String email) {
        Optional<AccountEntity> optionalUser = accountRepository.findByEmail(email);
        if (optionalUser.isPresent()){
            throw new RuntimeException("Account is already verified");
        }

        IMap<String, VerifyingUserDto> otpMap = hazelcastInstance.getMap("otpCodes");

        VerifyingUserDto verifying = otpMap.get(email);

        if (verifying == null) {
            throw new RuntimeException("Resend verification code requires initial sending.");
        }

        verifying.setVerificationCode(generateVerificationCode());
        otpMap.put(email, verifying, 60, TimeUnit.SECONDS);

        try {
            sendVerificationEmail(email, verifying.getVerificationCode());
        } catch (Exception e) {
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    @Override
    public void sendVerificationEmail(String email, String verificationCode) {
        String subject = "Account Verification";
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(email, subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }

}
