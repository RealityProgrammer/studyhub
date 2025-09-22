package com.hunre.it.webstudyonline.model.request;

import com.hunre.it.webstudyonline.model.dto.CourseDetailsDto;

import java.util.Date;
import java.util.List;
import java.util.Set;

public class AddTimetableRequest {
    private Long gradeId;
    private Date start_date;
    private String study_time;
    private String study_date;
    private String url;
    private List<CourseDetailsDto> courseDetailsDto;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getGradeId() {
        return gradeId;
    }

    public void setGradeId(Long gradeId) {
        this.gradeId = gradeId;
    }

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

    public List<CourseDetailsDto> getCourseDetailsDto() {
        return courseDetailsDto;
    }

    public void setCourseDetailsDto(List<CourseDetailsDto> courseDetailsDto) {
        this.courseDetailsDto = courseDetailsDto;
    }
}
