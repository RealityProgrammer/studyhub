package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.ExamEntity;
import com.hunre.it.webstudyonline.entity.PointEntity;
import com.hunre.it.webstudyonline.mapper.PointMapper;
import com.hunre.it.webstudyonline.model.dto.PointDto;
import com.hunre.it.webstudyonline.model.dto.auth.AuthDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.ExamRepository;
import com.hunre.it.webstudyonline.repository.PointRepository;
import com.hunre.it.webstudyonline.security.service.JwtService;
import com.hunre.it.webstudyonline.service.IPointService;
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
public class IPointServiceImpl implements IPointService {
    @Autowired
    private PointRepository pointRepository;
    @Autowired
    private PointMapper pointMapper;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private ExamRepository examRepository;
    @Override
    public ResponsePage<List<PointDto>> getAllPoints(Long examId,Pageable pageable) {
        ResponsePage<List<PointDto>> responsePage = new ResponsePage<>();
        Page<PointEntity> page = pointRepository.findAllByDeletedFalse(examId,pageable);
        List<PointDto> pointDtos = page.getContent().stream().map(pointMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(pointDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<PointDto> addPoint(PointDto pointDto) {
        BaseResponse<PointDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        PointEntity pointEntity = pointMapper.toEntity(email,pointDto);
        pointEntity.setDeleted(false);
        pointRepository.save(pointEntity);
        response.setData(pointMapper.toDto(pointEntity));
        response.setCode(HttpStatus.CREATED.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }


    @Override
    public BaseResponse<PointDto> updatePoint(String id, PointDto pointDto) {
        BaseResponse<PointDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long pointId = utils.getT();
        Optional<PointEntity> check = pointRepository.findById(pointId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        Optional<ExamEntity> entity = examRepository.findById(pointDto.getExamId());
        if (entity.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        PointEntity pointEntity = check.get();
        pointEntity.setScore(pointDto.getScore());
        pointEntity.setCompletionTime(pointDto.getCompletionTime());
        pointEntity.setExamEntity(entity.get());
        pointEntity.setDeleted(false);
        pointEntity.setId(pointId);
        pointRepository.save(pointEntity);
        response.setData(pointMapper.toDto(pointEntity));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }
    @Override
    public BaseResponse<PointDto> deletePoint(String id) {
        return handle(id,true);
    }

    @Override
    public BaseResponse<PointDto> getPoint(String id) {
        return handle(id,false);
    }
    public BaseResponse<PointDto> handle(String id,boolean isDelete) {
        BaseResponse<PointDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long pointId = utils.getT();
        Optional<PointEntity> pointEntity = pointRepository.findById(pointId);
        if (pointEntity.isEmpty()) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        PointEntity point = pointEntity.get();
        if (isDelete) {
            point.setDeleted(true);
        }
        point = pointRepository.save(point);
        PointDto dto = pointMapper.toDto(point);
        response.setData(dto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public ResponsePage<List<PointDto>> findByUser(Pageable pageable) {
        AuthDto authDto =jwtService.decodeToken();
        ResponsePage<List<PointDto>> responsePage = new ResponsePage<>();
        Page<PointEntity> page = pointRepository.findBytEmail(authDto.getEmail(),pageable);
        List<PointDto> pointDtos = page.getContent().stream().map(pointMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(pointDtos);
        return responsePage;    }
}
