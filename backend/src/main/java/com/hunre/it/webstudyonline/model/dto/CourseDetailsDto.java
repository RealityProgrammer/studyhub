package com.hunre.it.webstudyonline.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CourseDetailsDto {
    private Long id;
    @NotBlank(message = "Name must not be blank.")
    private String name;

    @NotBlank(message = "Description must not be blank.")
    private String description;

    @NotBlank(message = "Period must not be blank.")
    private String period;

    @NotBlank(message = "Url must not be blank.")
    private String url;

    @NotNull(message = "Course ID must not be null.")
    private Long courseId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }
}
