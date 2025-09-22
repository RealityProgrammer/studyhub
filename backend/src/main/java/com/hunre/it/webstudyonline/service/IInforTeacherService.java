package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.InforTeacherDto;
import com.hunre.it.webstudyonline.model.request.AddInforTeacherForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IInforTeacherService {
    ResponsePage<List<InforTeacherDto>> getAll(Pageable pageable);
    BaseResponse<InforTeacherDto> getInforTeacherById(String id);
    BaseResponse<InforTeacherDto> addInforTeacher(AddInforTeacherForm addInforTeacherForm);
    BaseResponse<InforTeacherDto> updateInforTeacher(InforTeacherDto inforTeacherDto, String id, MultipartFile file);
    BaseResponse<InforTeacherDto> deleteInforTeacher(String id);
}
