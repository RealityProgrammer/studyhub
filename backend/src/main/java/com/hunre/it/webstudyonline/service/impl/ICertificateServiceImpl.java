package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.CertificateEntity;
import com.hunre.it.webstudyonline.entity.InforTeacherEntity;
import com.hunre.it.webstudyonline.mapper.CertificateMapper;
import com.hunre.it.webstudyonline.model.dto.CertificateDto;
import com.hunre.it.webstudyonline.model.dto.auth.AuthDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.CertificateRepository;
import com.hunre.it.webstudyonline.repository.InforTeacherRepository;
import com.hunre.it.webstudyonline.security.service.JwtService;
import com.hunre.it.webstudyonline.service.ICertificateService;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ICertificateServiceImpl implements ICertificateService {
    @Autowired
    private CertificateRepository certificateRepository;
    @Autowired
    private CertificateMapper certificateMapper;
    @Autowired
    private InforTeacherRepository teacherRepository;
    @Autowired
    private JwtService jwtService;

    @Override
    public ResponsePage<List<CertificateDto>> getAllCertificates(Pageable pageable) {
        ResponsePage<List<CertificateDto>> responsePage = new ResponsePage<>();
        Page<CertificateEntity> page = certificateRepository.findAllByDeletedFalse(pageable);
        List<CertificateDto> certificateDtos = page.getContent().stream().map(certificateMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(certificateDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<CertificateDto> addCertificate(CertificateDto certificateDto) {
        BaseResponse<CertificateDto> response = new BaseResponse<>();
        Optional<InforTeacherEntity> check = teacherRepository.findById(certificateDto.getTeacherId());
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        CertificateEntity certificateEntity = certificateMapper.toEntity(certificateDto);
        certificateEntity.setDeleted(false);
        certificateEntity.setTeacherEntity(check.get());
        certificateRepository.save(certificateEntity);
        response.setData(certificateMapper.toDto(certificateEntity));
        response.setCode(HttpStatus.CREATED.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<CertificateDto> updateCertificate(String id, CertificateDto certificateDto) {
        BaseResponse<CertificateDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long certificateId = utils.getT();
        Optional<CertificateEntity> check = certificateRepository.findById(certificateId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        Optional<InforTeacherEntity> teacher = teacherRepository.findById(certificateDto.getTeacherId());
        if (teacher.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        CertificateEntity certificateEntity = certificateMapper.toEntity(certificateDto);
        certificateEntity.setDeleted(false);
        certificateEntity.setId(certificateId);
        certificateEntity.setTeacherEntity(teacher.get());
        certificateRepository.save(certificateEntity);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        response.setData(certificateMapper.toDto(certificateEntity));
        return response;
    }

    @Override
    public BaseResponse<CertificateDto> deleteCertificate(String id) {
        return handleCertificate(id,true);
    }

    @Override
    public BaseResponse<CertificateDto> getCertificateById(String id) {
        return handleCertificate(id,false);
    }

    @Override
    public ResponsePage<List<CertificateDto>> findByCertificateAttribute(String certificateName, String issuingOrganization, String certificateType, String certificateNumber, Pageable pageable) {
        ResponsePage<List<CertificateDto>> responsePage = new ResponsePage<>();
        Page<CertificateEntity> page = certificateRepository.findCertificateByAttribute(certificateName,issuingOrganization,certificateType,certificateNumber,pageable);
        List<CertificateDto> certificateDtos = page.getContent().stream().map(certificateMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(certificateDtos);
        return responsePage;
    }

    @Override
    public ResponsePage<List<CertificateDto>> findCertificateByEmail(Pageable pageable) {
        ResponsePage<List<CertificateDto>> responsePage = new ResponsePage<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Page<CertificateEntity> page = certificateRepository.findAllByEmail(pageable,email);
        List<CertificateDto> certificateDtos = page.getContent().stream().map(certificateMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(certificateDtos);
        return responsePage;
    }


    public BaseResponse<CertificateDto> handleCertificate(String id, boolean isDelete) {
        BaseResponse<CertificateDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long certificateId = utils.getT();
        Optional<CertificateEntity> certificate = certificateRepository.findById(certificateId);
        if (certificate.isEmpty()) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        CertificateEntity certificateEntity = certificate.get();
        if (isDelete) {
            certificateEntity.setDeleted(true);
        }
        certificateEntity = certificateRepository.save(certificateEntity);
        CertificateDto dto = certificateMapper.toDto(certificateEntity);
        response.setData(dto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }
}
