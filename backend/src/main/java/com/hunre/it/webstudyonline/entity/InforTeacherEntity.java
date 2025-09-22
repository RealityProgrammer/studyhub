package com.hunre.it.webstudyonline.entity;

import com.hunre.it.webstudyonline.utils.DateUtils;
import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name = "infor_teacher")
public class InforTeacherEntity extends AbstractEntity {
    private String address;
    private Integer experience;
    private LocalDate birthday;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    private AccountEntity account;

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
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
