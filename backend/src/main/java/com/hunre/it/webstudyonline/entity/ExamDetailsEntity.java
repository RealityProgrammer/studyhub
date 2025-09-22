package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "exam_details")
public class ExamDetailsEntity extends AbstractEntity{
    private String name;
    private String answer;
    private String description;
    private String url;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    @EqualsAndHashCode.Exclude
    private ExamEntity examEntity;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ExamEntity getExamEntity() {
        return examEntity;
    }

    public void setExamEntity(ExamEntity examEntity) {
        this.examEntity = examEntity;
    }
}
