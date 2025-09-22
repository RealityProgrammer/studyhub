package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.ImagesEntity;
import com.hunre.it.webstudyonline.entity.RoleEntity;
import com.hunre.it.webstudyonline.mapper.AccountMapper;
import com.hunre.it.webstudyonline.mapper.RoleMapper;
import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.dto.ImageDto;
import com.hunre.it.webstudyonline.model.dto.RoleDto;
import com.hunre.it.webstudyonline.model.dto.auth.AuthDto;
import com.hunre.it.webstudyonline.model.request.ChagePasswordRequest;
import com.hunre.it.webstudyonline.model.request.UpdateAccountForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.ImageRepository;
import com.hunre.it.webstudyonline.repository.RoleRepository;
import com.hunre.it.webstudyonline.security.service.JwtService;
import com.hunre.it.webstudyonline.service.IAccountService;
import com.hunre.it.webstudyonline.service.UploadImageFile;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.management.relation.Role;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class IAccountServiceImpl implements IAccountService {
    @Autowired
    private AccountMapper accountMapper;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private IRoleServiceImpl roleServiceImpl;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private UploadImageFile imageFile;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponsePage<List<AccountDto>> getAllAccounts(Pageable pageable) {
        ResponsePage<List<AccountDto>> responsePage = new ResponsePage<>();
        Page<AccountEntity> page = accountRepository.findByDeletedFalseWithRoles(pageable);
        List<AccountDto> accountDtos = page.getContent().stream().map(account -> {
            AccountDto accountDto = accountMapper.toDto(account);
            Set<RoleDto> roleDtos = account.getRoles().stream()
                    .map(roleMapper::toDto)
                    .collect(Collectors.toSet());
            accountDto.setRoles(roleDtos);
            Set<Long> roleId = account.getRoles().stream().map(RoleEntity::getId).collect(Collectors.toSet());
            accountDto.setRoleIds(roleId);
            return accountDto;
        }).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(accountDtos);
        return responsePage;
    }


    @Override
    public ResponsePage<List<AccountDto>> findUserByCondition(Pageable pageable, String fullname, String email) {
        ResponsePage<List<AccountDto>> responsePage = new ResponsePage<>();
        Page<AccountEntity> page = accountRepository.findByCondition(fullname, email, pageable);
        List<AccountDto> accountDtos = page.getContent().stream().map(accountMapper::toDto).collect(Collectors.toList());
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(accountDtos);
        return responsePage;
    }

    @Override
    public ResponsePage<List<AccountDto>> findUserByRole(Pageable pageable, String fullname, String email, String roleCode) {
        ResponsePage<List<AccountDto>> responsePage = new ResponsePage<>();
        Page<AccountEntity> page = accountRepository.findByRoleCode(fullname, roleCode, email, pageable);
        List<AccountDto> accountDtos = page.getContent().stream().map(accountMapper::toDto).collect(Collectors.toList());
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(accountDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<AccountDto> update(String id, UpdateAccountForm updateAccountForm, MultipartFile file) {
        BaseResponse<AccountDto> response = new BaseResponse<>();
        try {
            Utils<Long> utils = LongUtils.strToLong(id);
            if (utils.getT() == null) {
                response.setCode(utils.getCode());
                response.setMessage(utils.getMsg());
                return response;
            }
            Long AccountId = utils.getT();
            Optional<AccountEntity> check = accountRepository.findById(AccountId);
            if (check.isEmpty()) {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
                return response;
            }
            AccountEntity accountEntity = check.get();
            accountEntity.setFullname(updateAccountForm.getFullName());

            Set<RoleEntity> roleEntities = new HashSet<>();
            for (Long roleId : updateAccountForm.getRoleId()) {
                RoleEntity roleEntity = roleRepository.findById(roleId).orElseThrow();
                if (roleEntity != null) {
                    roleEntities.add(roleEntity);
                }
            }
            accountEntity.setRoles(roleEntities);
            accountRepository.save(accountEntity);
            ImagesEntity images = imageRepository.findByAccountId(AccountId);
            if (file != null && !file.isEmpty()) {
                if (images != null) {
                    imageFile.deleteImage(images.getPublicId());
                } else {
                    images = new ImagesEntity();
                    images.setAccountEntity(accountEntity);
                }
                ImageDto imageDTO = imageFile.uploadImage(file);
                images.setUrl(imageDTO.getUrl());
                images.setType(file.getContentType());
                images.setPublicId(imageDTO.getPublicId());
                imageRepository.save(images);
                updateAccountForm.setImageUrl(images.getUrl());
            } else if (images != null) {
                updateAccountForm.setImageUrl(images.getUrl());
            }
            AccountDto accountDto = accountMapper.toDto(accountEntity);
            accountDto.setImageUrl(updateAccountForm.getImageUrl());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            response.setCode(HttpStatus.OK.value());
            response.setData(accountDto);
        } catch (Exception e) {
            response.setCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage(e.getMessage());
        }
        return response;
    }

    @Override
    public BaseResponse<AccountDto> delete(String id) {
        BaseResponse<AccountDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long AccountId = utils.getT();
        Optional<AccountEntity> check = accountRepository.findById(AccountId);
        if (check.isEmpty()) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        AccountEntity accountEntity = check.get();
        accountEntity.setDeleted(true);
        accountRepository.save(accountEntity);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        response.setData(accountMapper.toDto(accountEntity));
        return response;
    }

    @Override
    public AccountDto findById(Long id) {
        AccountEntity accountEntity = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
        AccountDto accountDto = accountMapper.toDto(accountEntity);
        return accountDto;
    }

    @Override
    public BaseResponse<AccountDto> getAccount() {
        BaseResponse<AccountDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        if (authDto == null) {
            response.setCode(HttpStatus.UNAUTHORIZED.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        String email = authDto.getEmail();
        AccountEntity account = accountRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Account not found"));
        AccountDto accountDto = accountMapper.toDto(account);
        Set<RoleDto> roleDtos = account.getRoles().stream().map(roleMapper::toDto).collect(Collectors.toSet());
        Set<Long> roleId = account.getRoles().stream().map(RoleEntity::getId).collect(Collectors.toSet());
        if (account.getTeacher() != null) {
            accountDto.setTeacherId(account.getTeacher().getId());
        } else {
            accountDto.setTeacherId(null);
        }
        accountDto.setRoleIds(roleId);
        accountDto.setRoles(roleDtos);
        response.setData(accountDto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);

        return response;
    }

    @Override
    public BaseResponse<?> changePassword(String id, ChagePasswordRequest changePasswordRequest) {
        BaseResponse<?> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long accountId = utils.getT();
        Optional<AccountEntity> accountEntity = accountRepository.findById(accountId);
        if (accountEntity.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        AccountEntity account = accountEntity.get();
        if (!passwordEncoder.matches(changePasswordRequest.getOldPassword(), account.getPassword())) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.OLDPASSWORD);
            return response;
        }
        String newPassword = changePasswordRequest.getNewPassword();
        String confirmPassword = changePasswordRequest.getConfirmPassword();

        if (newPassword.equals(changePasswordRequest.getOldPassword())) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NEWPASSWORD);
            return response;
        }
        if (!newPassword.equals(confirmPassword)) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.CONFIRMPASSWORD);
            return response;
        }
        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public ResponsePage<List<AccountDto>> findAccountByAttribute(String fullname, String email, String role, Pageable pageable) {
        ResponsePage<List<AccountDto>> responsePage = new ResponsePage<>();
        Page<AccountEntity> page = accountRepository.findAccountByAttributes(fullname, email, role, pageable);
        List<AccountDto> accountDtos = page.getContent().stream().map(accountMapper::toDto).collect(Collectors.toList());
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(accountDtos);
        return responsePage;
    }

}
