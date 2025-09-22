package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "grade")
public class GradeEntity extends AbstractEntity {
    private String code;
    private String name;
    private Long number_student;
    private String study_time;
    private String study_date;
    private Date start_date;
    private Long remainStudent;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "grade_account",
            joinColumns = @JoinColumn(name = "grade_id"),
            inverseJoinColumns = @JoinColumn(name = "account_id")
    )
    private Set<AccountEntity> accounts = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "course_id")
    @EqualsAndHashCode.Exclude
    private CourseEntity courseEntity;

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

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

    public Set<AccountEntity> getAccounts() {
        return accounts;
    }

    public void setAccounts(Set<AccountEntity> accounts) {
        this.accounts = accounts;
    }

    public CourseEntity getCourseEntity() {
        return courseEntity;
    }

    public void setCourseEntity(CourseEntity courseEntity) {
        this.courseEntity = courseEntity;
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

    public Long getRemainStudent() {
        return remainStudent;
    }

    public void setRemainStudent(Long remainStudent) {
        this.remainStudent = remainStudent;
    }
}
