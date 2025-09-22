package com.hunre.it.webstudyonline.model.dto;

import java.util.Date;
import java.util.Set;

public class GradeDto {
    private Long id;
    private String code;
    private String name;
    private Long number_student;
    private Long course_id;
    private Long remain_student;
    private Set<Long> account_id;
    private String course_name;
    private Set<AccountDto> accountDto;
    private Date start_date;
    private String study_time;
    private String study_date;

    public String getStudy_time() {
        return study_time;
    }

    public void setStudy_time(String study_time) {
        this.study_time = study_time;
    }

    public String getStudy_date() {
        return study_date;
    }

    public void setStudy_date(String study_date) {
        this.study_date = study_date;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Set<AccountDto> getAccountDto() {
        return accountDto;
    }

    public void setAccountDto(Set<AccountDto> accountDto) {
        this.accountDto = accountDto;
    }

    public String getCourse_name() {
        return course_name;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public Long getCourse_id() {
        return course_id;
    }

    public void setCourse_id(Long course_id) {
        this.course_id = course_id;
    }

    public Set<Long> getAccount_id() {
        return account_id;
    }

    public void setAccount_id(Set<Long> account_id) {
        this.account_id = account_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getNumber_student() {
        return number_student;
    }

    public void setNumber_student(Long number_student) {
        this.number_student = number_student;
    }

    public Long getRemain_student() {
        return remain_student;
    }

    public void setRemain_student(Long remain_student) {
        this.remain_student = remain_student;
    }
}
