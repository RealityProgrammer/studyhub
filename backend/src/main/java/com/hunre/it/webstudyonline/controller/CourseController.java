package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.ICourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/course")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class CourseController {
    @Autowired
    private ICourseService courseService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<CourseDto>>> getAll(Pageable pageable) {
        ResponsePage<List<CourseDto>> responsePage = courseService.getCourses(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @PostMapping
    public ResponseEntity<BaseResponse<CourseDto>> create (@ModelAttribute CourseDto courseDto,
                                                           @RequestParam("file") MultipartFile file) throws IOException {
        BaseResponse<CourseDto> response = courseService.addCourse(courseDto, file);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<CourseDto>> update(@PathVariable String id,
                                                          @ModelAttribute @Valid CourseDto courseDto,
                                                          @RequestParam(value = "file" ,required = false) MultipartFile file) throws IOException {
        BaseResponse<CourseDto> response = courseService.updateCourse(id, courseDto, file);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<CourseDto>> delete(@PathVariable Long id) {
        BaseResponse<CourseDto> response = courseService.deleteCourse(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<CourseDto>> findById(@PathVariable Long id) {
        BaseResponse<CourseDto> response = courseService.getCourseById(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findByCondition")
    public ResponseEntity<ResponsePage<List<CourseDto>>> findByCondition(@RequestParam Map<String,String> params, Pageable pageable) {
        ResponsePage<List<CourseDto>> response = courseService.getCourseByCondition(params,pageable);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getBestseller")
    public ResponseEntity<ResponsePage<List<CourseDto>>> getBestseller(Pageable pageable) {
        ResponsePage<List<CourseDto>> response = courseService.getCourseBestSeller(pageable);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findByCreateBy")
    public ResponseEntity<ResponsePage<List<CourseDto>>> findByCreateBy(Pageable pageable) {
        ResponsePage<List<CourseDto>> response = courseService.getCourseByCreatedBy(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findCourseByEmailTeacher")
    public ResponseEntity<ResponsePage<List<CourseDto>>> findByCourseByEmailTeacher(Pageable pageable,@RequestParam(value = "email") String email) {
        ResponsePage<List<CourseDto>> response = courseService.getCourseByEmailTeacher(pageable,email);
        return ResponseEntity.ok(response);
    }
}
