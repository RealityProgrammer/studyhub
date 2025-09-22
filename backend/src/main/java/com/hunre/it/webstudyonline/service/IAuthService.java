package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.model.dto.auth.LoginUserDto;
import com.hunre.it.webstudyonline.model.dto.auth.RegisterUserDto;
import com.hunre.it.webstudyonline.model.dto.auth.VerifyUserDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;

public interface IAuthService {
    BaseResponse<RegisterUserDto> signup(RegisterUserDto input);
    AccountEntity authenticate(LoginUserDto input);
    void verifyUser(VerifyUserDto input);
    void resendVerificationCode(String email);
    void sendVerificationEmail(String email, String verificationCode);
}
