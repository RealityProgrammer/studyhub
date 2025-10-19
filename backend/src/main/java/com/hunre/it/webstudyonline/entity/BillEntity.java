package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "bill")

public class BillEntity extends AbstractEntity {
    private String code;
    @ManyToOne
    @JoinColumn(name = "account_id")
    @ToString.Exclude
    private AccountEntity accountEntity;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public BillEntity() {
    }

    public BillEntity(String code, AccountEntity accountEntity, LocalDateTime createdAt) {
        this.code = code;
        this.accountEntity = accountEntity;
        this.createdAt = createdAt;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
