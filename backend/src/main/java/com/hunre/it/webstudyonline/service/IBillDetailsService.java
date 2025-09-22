package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.BillDetailsDto;
import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBillDetailsService {
    ResponsePage<List<BillDetailsDto>> getAllBillDetails(String billId, Pageable pageable);
    BaseResponse<BillDetailsDto> createBillDetails(BillDetailsDto billDetailsDto);
    ResponsePage<List<CourseDto>> getAllCourseEnrolled(Pageable pageable);

    BaseResponse<CourseDto> getCourse(Long courseId);
}
