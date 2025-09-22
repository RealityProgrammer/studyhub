package com.hunre.it.webstudyonline.model.dto;

public class PointDto {
    private Long id;
    private Double score;
    private Long completionTime;
    private Long accountId;
    private Long examId;
    private ExamDto examDto;
    private String accountName;

    public ExamDto getExamDto() {
        return examDto;
    }

    public void setExamDto(ExamDto examDto) {
        this.examDto = examDto;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Long getCompletionTime() {
        return completionTime;
    }

    public void setCompletionTime(Long completionTime) {
        this.completionTime = completionTime;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }
}
