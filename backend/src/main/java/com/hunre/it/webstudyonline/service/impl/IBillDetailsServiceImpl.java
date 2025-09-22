package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.BillDetailsEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.entity.ImagesEntity;
import com.hunre.it.webstudyonline.mapper.BillDetailsMapper;
import com.hunre.it.webstudyonline.mapper.CourseMapper;
import com.hunre.it.webstudyonline.model.dto.BillDetailsDto;
import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.dto.auth.AuthDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.*;
import com.hunre.it.webstudyonline.security.service.JwtService;
import com.hunre.it.webstudyonline.service.IBillDetailsService;
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
import java.util.stream.Collectors;

@Service
public class IBillDetailsServiceImpl implements IBillDetailsService {
    @Autowired
    private BillDetailsRepository billDetailsRepository;
    @Autowired
    private BillDetailsMapper billDetailsMapper;
    @Autowired
    private JwtService  jwtService;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CourseMapper courseMapper;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private  ImageRepository imageRepository;
    @Override
    public ResponsePage<List<BillDetailsDto>> getAllBillDetails(String billId, Pageable pageable) {
        ResponsePage<List<BillDetailsDto>> responsePage = new ResponsePage<>();
        Utils<Long> utils = LongUtils.strToLong(billId);
        Long billIdLong = utils.getT();
        Page<BillDetailsEntity> billDetailsPage = billDetailsRepository.getByBillId(billIdLong, pageable);
        List<BillDetailsDto> billDetailsDtos = billDetailsPage.getContent()
                .stream()
                .map(billDetailsMapper::toDto)
                .collect(Collectors.toList());
        responsePage.setContent(billDetailsDtos);
        responsePage.setPageNumber(billDetailsPage.getNumber());
        responsePage.setPageSize(billDetailsPage.getSize());
        responsePage.setTotalElements(billDetailsPage.getTotalElements());
        responsePage.setTotalPages(billDetailsPage.getTotalPages());

        return responsePage;
    }

    @Override
    public BaseResponse<BillDetailsDto> createBillDetails(BillDetailsDto billDetailsDto) {
        BaseResponse<BillDetailsDto> response = new BaseResponse<>();
        BillDetailsEntity billDetailsEntity = billDetailsMapper.toEntity(billDetailsDto);
        billDetailsEntity.setDeleted(false);
        billDetailsEntity = billDetailsRepository.save(billDetailsEntity);
        response.setData(billDetailsMapper.toDto(billDetailsEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.CREATED.value());
        return response;
    }

    @Override
    public ResponsePage<List<CourseDto>> getAllCourseEnrolled(Pageable pageable) {
        ResponsePage<List<CourseDto>> responsePage = new ResponsePage<>();
        AuthDto authDto = jwtService.decodeToken();
        AccountEntity accountEntity = accountRepository.findByEmail(authDto.getEmail()).orElseThrow(() -> new RuntimeException(Constant.HTTP_MESSAGE.NOTFOUND));
        Page<CourseEntity> courseEntities = courseRepository.getAllCourseEnrolled(accountEntity.getId(),pageable);
        for (CourseEntity courseEntity : courseEntities) {
            if (gradeRepository.checkGradeEnrolled(courseEntity.getId(),accountEntity.getId()).isEmpty()){
                courseEntity.setStatus("false");
            }else {
                courseEntity.setStatus("true");
            }
        }
        List<CourseDto> courseDtos = courseEntities
                .stream()
                .map(courseEntity -> {
                    CourseDto courseDto = courseMapper.toDto(courseEntity);
                    List<ImagesEntity> images = imageRepository.findByCourseId(courseEntity.getId());
                    if (!images.isEmpty()) {
                        ImagesEntity image = images.get(0);
                        courseDto.setImageUrl(image.getUrl());
                    }
                    return courseDto;})
                .collect(Collectors.toList());

        responsePage.setContent(courseDtos);
        responsePage.setPageNumber(courseEntities.getNumber());
        responsePage.setPageSize(courseEntities.getSize());
        responsePage.setTotalElements(courseEntities.getTotalElements());
        responsePage.setTotalPages(courseEntities.getTotalPages());
        return responsePage;
    }

    @Override
    public BaseResponse<CourseDto> getCourse(Long courseId) {
        BaseResponse<CourseDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        AccountEntity accountEntity = accountRepository.findByEmail(authDto.getEmail()).orElseThrow(() -> new RuntimeException(Constant.HTTP_MESSAGE.NOTFOUND));
        CourseDto courseDto = null;
        Optional<CourseEntity> courseEntities = courseRepository.getCourseByUser(accountEntity.getId(),courseId);
            if (courseEntities.isPresent()) {
            courseDto = courseMapper.toDto(courseEntities.get());
        }
        response.setData(courseDto);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }
}
