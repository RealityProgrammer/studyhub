package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.ExamDetailsDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IExamDetailsService {
    ResponsePage<List<ExamDetailsDto>> getAllExamDetails(String id, Pageable pageable);
    BaseResponse<ExamDetailsDto> addExamDetails(ExamDetailsDto examDetailsDto);
    BaseResponse<ExamDetailsDto> updateExamDetails(String id,ExamDetailsDto examDetailsDto);
    BaseResponse<ExamDetailsDto> deleteExamDetails(String id);
    BaseResponse<ExamDetailsDto> getExamDetails(String id);

}
