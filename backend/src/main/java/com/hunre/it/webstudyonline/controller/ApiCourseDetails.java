package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.CourseDetailsDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.ICourseDetailsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/coursedetails")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ApiCourseDetails {
    @Autowired
    private ICourseDetailsService courseDetailsService;

    @GetMapping("/list/{id}")
    public ResponseEntity<ResponsePage<List<CourseDetailsDto>>> getCourseDetails(@PathVariable String id, Pageable pageable) {
        ResponsePage<List<CourseDetailsDto>> response = courseDetailsService.getAll(id, pageable);
        return ResponseEntity.ok(response);
    }
    @PostMapping
    public ResponseEntity<BaseResponse<CourseDetailsDto>> addCourseDetails(@Valid @RequestBody CourseDetailsDto courseDetailsDto) {
        BaseResponse<CourseDetailsDto> response = courseDetailsService.addCourseDetails(courseDetailsDto);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<CourseDetailsDto>> updateCourseDetails(@PathVariable String id, @RequestBody @Valid CourseDetailsDto dto) {
        BaseResponse<CourseDetailsDto> response = courseDetailsService.updateCourseDetails(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<CourseDetailsDto>> deleteCourseDetails(@PathVariable String id) {
        BaseResponse<CourseDetailsDto> response = courseDetailsService.deleteCourseDetails(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<CourseDetailsDto>> getCourseDetailsById(@PathVariable String id) {
        BaseResponse<CourseDetailsDto> response = courseDetailsService.getCourseDetailsById(id);
        return ResponseEntity.ok(response);
    }
}
