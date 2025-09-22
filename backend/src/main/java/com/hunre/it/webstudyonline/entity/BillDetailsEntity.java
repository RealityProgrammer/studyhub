package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.ToString;

import java.math.BigDecimal;

@Entity
@Table(name = "bill_details")
public class BillDetailsEntity extends AbstractEntity {
    private Integer quantity;
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "bill_id")
    @ToString.Exclude
    private BillEntity billEntity;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @ToString.Exclude
    private CourseEntity courseEntity;



    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BillEntity getBillEntity() {
        return billEntity;
    }

    public void setBillEntity(BillEntity billEntity) {
        this.billEntity = billEntity;
    }

    public CourseEntity getCourseEntity() {
        return courseEntity;
    }

    public void setCourseEntity(CourseEntity courseEntity) {
        this.courseEntity = courseEntity;
    }
}
