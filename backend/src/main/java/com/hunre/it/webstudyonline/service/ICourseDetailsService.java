package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.CourseDetailsDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICourseDetailsService {
    ResponsePage<List<CourseDetailsDto>> getAll(String courseId, Pageable pageable);
    BaseResponse<CourseDetailsDto> addCourseDetails(CourseDetailsDto courseDetailsDto);
    BaseResponse<CourseDetailsDto> updateCourseDetails(String id,CourseDetailsDto courseDetailsDto);
    BaseResponse<CourseDetailsDto> deleteCourseDetails(String id);
    BaseResponse<CourseDetailsDto> getCourseDetailsById(String id);
//    BaseResponse<CourseDetailsDto> updateRecord(String id,MultipartFile file);

}
