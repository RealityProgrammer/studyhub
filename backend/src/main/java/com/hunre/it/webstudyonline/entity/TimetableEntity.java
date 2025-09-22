package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "timetable")
public class TimetableEntity extends AbstractEntity {
    private Date date;
    private String url;
    private String period;
    private String name;
    private String time;

    @ManyToOne
    @JoinColumn(name = "grade_id")
    @EqualsAndHashCode.Exclude
    private GradeEntity gradeEntity;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public GradeEntity getGradeEntity() {
        return gradeEntity;
    }

    public void setGradeEntity(GradeEntity gradeEntity) {
        this.gradeEntity = gradeEntity;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
