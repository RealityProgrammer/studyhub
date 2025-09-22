package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.ExamDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IExamService {
    ResponsePage<List<ExamDto>> getAll(Pageable pageable);
    BaseResponse<ExamDto> addExam(ExamDto examDto);
    BaseResponse<ExamDto> updateExam(String id,ExamDto examDto);
    BaseResponse<ExamDto> deleteExam(String id);
    BaseResponse<ExamDto> getExamById(String id);
    BaseResponse<ExamDto> getExamByCode(String examCode);
    ResponsePage<List<ExamDto>> findByCodeAndName(String name, String code,Pageable pageable);
}
