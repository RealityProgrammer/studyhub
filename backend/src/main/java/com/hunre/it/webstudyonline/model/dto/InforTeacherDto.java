package com.hunre.it.webstudyonline.model.dto;

import com.hunre.it.webstudyonline.utils.DateUtils;

import java.time.LocalDate;

public class InforTeacherDto {
    private Long id;
    private String address;
    private Integer experience;
    private LocalDate birthday;
    private AccountDto accountDto;

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public AccountDto getAccountDto() {
        return accountDto;
    }

    public void setAccountDto(AccountDto accountDto) {
        this.accountDto = accountDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = DateUtils.strToDate(birthday);
    }
}
