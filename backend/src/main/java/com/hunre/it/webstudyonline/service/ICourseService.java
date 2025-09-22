package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ICourseService {
    ResponsePage<List<CourseDto>> getCourses(Pageable pageable);
    BaseResponse<CourseDto> addCourse(CourseDto courseDto, MultipartFile file);
    BaseResponse<CourseDto> updateCourse(String id,CourseDto courseDto,MultipartFile file);
    BaseResponse<CourseDto> deleteCourse(Long id);
    BaseResponse<CourseDto> getCourseById(Long id);
    ResponsePage<List<CourseDto>> getCourseByCondition(Map<String, String> params, Pageable pageable);
    ResponsePage<List<CourseDto>> getCourseByCreatedBy(Pageable pageable);
    ResponsePage<List<CourseDto>> getCourseBestSeller(Pageable pageable);
    ResponsePage<List<CourseDto>> getCourseByEmailTeacher(Pageable pageable,String email);
}
