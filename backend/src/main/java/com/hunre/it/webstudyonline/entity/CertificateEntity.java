package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "certificate")
public class CertificateEntity extends AbstractEntity{
    @Column(name = "name")
    private String certificateName;

    @Column(name = "description")
    private String description;

    @Column(name = "organization")
    private String issuingOrganization;

    @Column(name = "type")
    private String certificateType;

    @Column(name = "number")
    private String certificateNumber;

    @Column(name = "issue_date")
    private String issueDate;


    @ManyToOne
    @JoinColumn(name = "teacher_id")
    @EqualsAndHashCode.Exclude
    private InforTeacherEntity inforTeacherEntity;

    public String getCertificateName() {
        return certificateName;
    }

    public void setCertificateName(String certificateName) {
        this.certificateName = certificateName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIssuingOrganization() {
        return issuingOrganization;
    }

    public void setIssuingOrganization(String issuingOrganization) {
        this.issuingOrganization = issuingOrganization;
    }

    public String getCertificateType() {
        return certificateType;
    }

    public void setCertificateType(String certificateType) {
        this.certificateType = certificateType;
    }

    public String getCertificateNumber() {
        return certificateNumber;
    }

    public void setCertificateNumber(String certificateNumber) {
        this.certificateNumber = certificateNumber;
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public InforTeacherEntity getTeacherEntity() {
        return inforTeacherEntity;
    }

    public void setTeacherEntity(InforTeacherEntity inforTeacherEntity) {
        this.inforTeacherEntity = inforTeacherEntity;
    }
}
