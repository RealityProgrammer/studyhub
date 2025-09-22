package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;


import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "account")

public class AccountEntity extends AbstractEntity{
    private String code;
    private String fullname;
    private String password;
    private String email;
    private String phone;
    private boolean enabled;
    @OneToOne(mappedBy = "account")
    private InforTeacherEntity teacher;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "account_role",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<RoleEntity> roles = new HashSet<>();
    @ManyToMany(mappedBy = "accounts")
    private Set<GradeEntity> grades = new HashSet<>();

    public Set<GradeEntity> getGrades() {
        return grades;
    }

    public void setGrades(Set<GradeEntity> grades) {
        this.grades = grades;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public AccountEntity(String code, String fullname, String password, String email, String phone) {
        this.code = code;
        this.fullname = fullname;
        this.password = password;
        this.email = email;
        this.phone = phone;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public AccountEntity() {
    }

    public InforTeacherEntity getTeacher() {
        return teacher;
    }

    public void setTeacher(InforTeacherEntity teacher) {
        this.teacher = teacher;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }


    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<RoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleEntity> roles) {
        this.roles = roles;
    }
}
