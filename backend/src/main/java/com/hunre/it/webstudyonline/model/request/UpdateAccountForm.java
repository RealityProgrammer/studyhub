package com.hunre.it.webstudyonline.model.request;

import jakarta.validation.constraints.NotBlank;

import java.util.Set;

public class UpdateAccountForm {
    @NotBlank(message = "Please enter full name")
    private String fullName;
    private Set<Long> roleId ;
    private String imageUrl;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Set<Long> getRoleId() {
        return roleId;
    }

    public void setRoleId(Set<Long> roleId) {
        this.roleId = roleId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
