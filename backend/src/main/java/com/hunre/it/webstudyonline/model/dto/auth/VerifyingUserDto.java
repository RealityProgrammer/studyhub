package com.hunre.it.webstudyonline.model.dto.auth;

public class VerifyingUserDto {
    private String verificationCode;
    private SignUpUserDto userDto;

    public VerifyingUserDto(String verificationCode, SignUpUserDto userDto) {
        this.verificationCode = verificationCode;
        this.userDto = userDto;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public SignUpUserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(SignUpUserDto userDto) {
        this.userDto = userDto;
    }
}
