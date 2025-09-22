package com.hunre.it.webstudyonline.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ExamDto {
    private Long id;
    private String code;
    @NotBlank(message = "Name cannot be empty")
    private String name;
    @NotNull(message = "Duration cannot be empty")
    private Integer duration;
    @NotNull(message = "Number question cannot be empty")
    private Integer number_question;
    private LocalDateTime created_at;
    private Boolean isFree;

    public Boolean getFree() {
        return isFree;
    }

    public void setFree(Boolean free) {
        isFree = free;
    }


    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getNumber_question() {
        return number_question;
    }

    public void setNumber_question(Integer number_question) {
        this.number_question = number_question;
    }

}
