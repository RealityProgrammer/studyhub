package com.hunre.it.webstudyonline.model.dto;

import jakarta.validation.constraints.NotBlank;

public class CategoryDto {
    private Long id;
    private String code;
    @NotBlank(message = "Name cannot be empty")
    private String name;

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

    public @NotBlank(message = "Name cannot be empty") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "Name cannot be empty") String name) {
        this.name = name;
    }
}
