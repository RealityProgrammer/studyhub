package com.hunre.it.webstudyonline.model.request;

import java.math.BigDecimal;
import java.util.Set;

public class AddRoadmapForm {
    private Set<Long> idCourses;
    private String name;
    private String description;
    private Integer discount;
    private BigDecimal price;

    public Set<Long> getIdCourses() {
        return idCourses;
    }

    public void setIdCourses(Set<Long> idCourses) {
        this.idCourses = idCourses;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
