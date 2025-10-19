package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "bill")

public class BillEntity extends AbstractEntity {
    private String code;
    @ManyToOne
    @JoinColumn(name = "account_id")
    @ToString.Exclude
    private AccountEntity accountEntity;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    public BillEntity() {
    }

    public BillEntity(String code, AccountEntity accountEntity, LocalDateTime createdDate) {
        this.code = code;
        this.accountEntity = accountEntity;
        this.createdDate = createdDate;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public AccountEntity getAccountEntity() {
        return accountEntity;
    }

    public void setAccountEntity(AccountEntity accountEntity) {
        this.accountEntity = accountEntity;
    }

    @Override
    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    @Override
    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
