package com.hunre.it.webstudyonline.controller;


import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.mapper.AccountMapper;
import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.dto.auth.*;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.LoginResponse;
import com.hunre.it.webstudyonline.security.service.JwtService;
import com.hunre.it.webstudyonline.service.IAuthService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiAuth {
    @Autowired
    private IAuthService iAuthService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountMapper accountMapper;


    @PostMapping("/signup")
    public ResponseEntity<BaseResponse<SignUpUserDto>> signup(@RequestBody SignUpUserDto input) {
        BaseResponse<SignUpUserDto> userDTO = iAuthService.signup(input);
        return ResponseEntity.ok(userDTO);
    }



    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        LoggerFactory.getLogger(ApiAuth.class).info("authenticate");

        AccountEntity authenticatedUser = iAuthService.authenticate(loginUserDto);
        AccountDto accountDto = accountMapper.toDto(authenticatedUser);
        String jwtToken = jwtService.generateToken(accountDto);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }


    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        try {
            iAuthService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/decode-token")
    public ResponseEntity<AuthDto> decodeToken() {
        AuthDto decodedClaims = jwtService.decodeToken();
        return ResponseEntity.ok(decodedClaims);
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            iAuthService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

