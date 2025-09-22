package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.BillDetailsDto;
import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.IBillDetailsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bill_details")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ApiBillDetails {
    @Autowired
    private IBillDetailsService billDetailsService;

    @GetMapping("/list/{billId}")
    public ResponseEntity<ResponsePage<List<BillDetailsDto>>> getAllBillDetails(@PathVariable String billId, Pageable pageable) {
        ResponsePage<List<BillDetailsDto>> response = billDetailsService.getAllBillDetails(billId, pageable);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/create")
    public ResponseEntity<BaseResponse<BillDetailsDto>> create(@Valid @RequestBody BillDetailsDto billDto) {
        BaseResponse<BillDetailsDto> bill = billDetailsService.createBillDetails(billDto);
        return ResponseEntity.ok(bill);
    }
    @GetMapping("/listCourseEnrolled")
    public ResponseEntity<ResponsePage<List<CourseDto>>> getAllCourseEnrolled(Pageable pageable) {
        ResponsePage<List<CourseDto>> response = billDetailsService.getAllCourseEnrolled(pageable);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getCourse")
    public ResponseEntity<BaseResponse<CourseDto>> getCourse(@RequestParam Long courseId) {
        BaseResponse<CourseDto> response = billDetailsService.getCourse(courseId);
        return ResponseEntity.ok(response);
    }
}
