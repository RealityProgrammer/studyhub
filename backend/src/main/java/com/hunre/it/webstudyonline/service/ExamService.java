package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.entity.ExamEntity;
import com.hunre.it.webstudyonline.mapper.ExamMapper;
import com.hunre.it.webstudyonline.model.dto.ExamDto;
import com.hunre.it.webstudyonline.model.dto.auth.AuthDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.BillRepository;
import com.hunre.it.webstudyonline.repository.ExamRepository;
import com.hunre.it.webstudyonline.security.service.JwtService;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.GenerateCode;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamService {
    @Autowired
    private ExamRepository examRepository;
    @Autowired
    private ExamMapper examMapper;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private BillRepository billRepository;

    public ResponsePage<List<ExamDto>> getExams(Pageable pageable) {
        ResponsePage<List<ExamDto>> responsePage = new ResponsePage<>();

        Page<ExamEntity> page = examRepository.getExams(pageable);
        List<ExamDto> examDtos = page.getContent().stream().map(examMapper::toDto).toList();

        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(examDtos);

        return responsePage;
    }

    public ResponsePage<List<ExamDto>> getUserExams(Pageable pageable) {
        ResponsePage<List<ExamDto>> responsePage = new ResponsePage<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        boolean check = billRepository.checkBill(email);
        Page<ExamEntity> page = examRepository.getExams(pageable, true);
        List<ExamDto> examDtos = page.getContent().stream().map(examMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(examDtos);

        return responsePage;
    }

    public ResponsePage<List<ExamDto>> getCreatedByUser(Pageable pageable) {
        ResponsePage<List<ExamDto>> responsePage = new ResponsePage<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Page<ExamEntity> page = examRepository.getExamsCreatedBy(pageable, email);
        List<ExamDto> examDtos = page.getContent().stream().map(examMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(examDtos);

        return responsePage;
    }

    public BaseResponse<ExamDto> addExam(ExamDto examDto) {
        BaseResponse<ExamDto> response = new BaseResponse<>();
        ExamEntity examEntity = examMapper.toEntity(examDto);
        examEntity.setCode(GenerateCode.generateUniqueCode("EXAM"));
        examEntity.setDeleted(false);
        examEntity = examRepository.save(examEntity);
        response.setData(examMapper.toDto(examEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.CREATED.value());
        return response;
    }

    public BaseResponse<ExamDto> updateExam(String id, ExamDto examDto) {
        BaseResponse<ExamDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long examId = utils.getT();
        ExamEntity examEntity = examMapper.toEntity(examDto);
        Optional<ExamEntity> optionalExam = examRepository.findById(examId);
        if (optionalExam.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        examEntity.setDeleted(false);
        examEntity.setId(examId);
        examRepository.save(examEntity);
        response.setData(examMapper.toDto(examEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    public BaseResponse<ExamDto> deleteExam(String id) {
        return handleExam(id,true);
    }

    public BaseResponse<ExamDto> getExamById(String id) {
        return handleExam(id,false);
    }

    public ResponsePage<List<ExamDto>> findByCodeAndName(String name, String code, Pageable pageable) {
        ResponsePage<List<ExamDto>> responsePage = new ResponsePage<>();
        Page<ExamEntity> page = examRepository.getExamsByNameAndCode(name,code,pageable);
        List<ExamDto> examDtos = page.getContent().stream().map(examMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(examDtos);
        return responsePage;
    }

    public BaseResponse<ExamDto> getExamByCode(String examCode) {
        BaseResponse<ExamDto> response = new BaseResponse<>();
        ExamEntity examEntity = examRepository.findByCode(examCode);
        ExamDto examDto = examMapper.toDto(examEntity);
        response.setData(examMapper.toDto(examEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }
    public BaseResponse<ExamDto> handleExam(String id, boolean isDelete) {
        BaseResponse<ExamDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long examId = utils.getT();
        Optional<ExamEntity> examEntity = examRepository.findById(examId);
        if (examEntity.isEmpty()) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        ExamEntity entity = examEntity.get();
        if (isDelete) {
            entity.setDeleted(true);
        }
        entity = examRepository.save(entity);
        ExamDto dto = examMapper.toDto(entity);
        response.setData(dto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }
}

