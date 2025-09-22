package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.ExamDetailsEntity;
import com.hunre.it.webstudyonline.entity.ExamEntity;
import com.hunre.it.webstudyonline.mapper.ExamDetailsMapper;
import com.hunre.it.webstudyonline.model.dto.ExamDetailsDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.ExamDetailsRepository;
import com.hunre.it.webstudyonline.repository.ExamRepository;
import com.hunre.it.webstudyonline.service.IExamDetailsService;
import com.hunre.it.webstudyonline.utils.Constant;
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
public class IExamDetailsServiceImpl implements IExamDetailsService {
    @Autowired
    private ExamDetailsRepository examDetailsRepository;
    @Autowired
    private ExamDetailsMapper examDetailsMapper;
    @Autowired
    private ExamRepository examRepository;

    @Override
    public ResponsePage<List<ExamDetailsDto>> getAllExamDetails(String id, Pageable pageable) {
        ResponsePage<List<ExamDetailsDto>> responsePage = new ResponsePage<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        Long examId = utils.getT();
        Page<ExamDetailsEntity> page = examDetailsRepository.findAllExamDetailsByExamId(examId,pageable);
        List<ExamDetailsDto> examDetailsDtos = page.stream().map(examDetailsMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(examDetailsDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<ExamDetailsDto> addExamDetails(ExamDetailsDto examDetailsDto) {
        BaseResponse<ExamDetailsDto> response = new BaseResponse<>();
        Optional<ExamEntity> optionalExam = examRepository.findById(examDetailsDto.getExamId());
        if (optionalExam.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        ExamDetailsEntity examDetailsEntity = examDetailsMapper.toEntity(examDetailsDto);
        examDetailsEntity.setDeleted(false);
        examDetailsEntity.setExamEntity(optionalExam.get());
        examDetailsEntity = examDetailsRepository.save(examDetailsEntity);
        response.setData(examDetailsMapper.toDto(examDetailsEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<ExamDetailsDto> updateExamDetails(String id,ExamDetailsDto examDetailsDto) {
        BaseResponse<ExamDetailsDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long examDetailsId = utils.getT();
        Optional<ExamDetailsEntity> optionalExamDetails = examDetailsRepository.findById(examDetailsId);
        if (optionalExamDetails.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        Optional<ExamEntity> optionalExam = examRepository.findById(examDetailsDto.getExamId());
        if (optionalExam.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        ExamDetailsEntity examDetailsEntity = examDetailsMapper.toEntity(examDetailsDto);
        examDetailsEntity.setExamEntity(optionalExam.get());
        examDetailsEntity.setId(examDetailsId);
        examDetailsEntity.setDeleted(false);
        examDetailsEntity = examDetailsRepository.save(examDetailsEntity);
        response.setData(examDetailsMapper.toDto(examDetailsEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());

        return response;
    }

    @Override
    public BaseResponse<ExamDetailsDto> deleteExamDetails(String id) {
        return handleExamDetails(id, true);
    }

    @Override
    public BaseResponse<ExamDetailsDto> getExamDetails(String id) {
        return handleExamDetails(id, false);
    }
    public BaseResponse<ExamDetailsDto> handleExamDetails(String id, boolean isDelete) {
        BaseResponse<ExamDetailsDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long examDetailsId = utils.getT();
        Optional<ExamDetailsEntity> certificate = examDetailsRepository.findById(examDetailsId);
        if (certificate.isEmpty()) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        ExamDetailsEntity examDetailsEntity = certificate.get();
        if (isDelete) {
            examDetailsEntity.setDeleted(true);
        }
        examDetailsEntity = examDetailsRepository.save(examDetailsEntity);
        ExamDetailsDto dto = examDetailsMapper.toDto(examDetailsEntity);
        response.setData(dto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }
}
