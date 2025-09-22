package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.GradeDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.text.ParseException;
import java.util.List;

public interface IGradeService {
    ResponsePage<List<GradeDto>> getAllGrades(Pageable pageable);
    BaseResponse<GradeDto> getGradeById(String id);
    BaseResponse<GradeDto> addGrade(GradeDto gradeDto) throws ParseException;
    BaseResponse<GradeDto> updateGrade(String id, GradeDto gradeDto);
    BaseResponse<GradeDto> deleteGrade(String id);
    BaseResponse<List<GradeDto>> getGradeByEmail();

    BaseResponse<List<GradeDto>> findByCourse(String id);
    BaseResponse<String> signInGrade(String id);
    BaseResponse<String> addStudentIntoGrade(String id, List<String> studentEmails);
    BaseResponse<String> deleteStudentOuttoGrade(String id, String studentEmail);

    BaseResponse<GradeDto> findByCourseAndUser(String id);
    ResponsePage<List<GradeDto>> findByEmail(Pageable pageable);
}
