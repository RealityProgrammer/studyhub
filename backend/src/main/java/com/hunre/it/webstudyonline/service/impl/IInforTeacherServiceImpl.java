package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.ImagesEntity;
import com.hunre.it.webstudyonline.entity.InforTeacherEntity;
import com.hunre.it.webstudyonline.mapper.InforTeacherMapper;
import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.dto.ImageDto;
import com.hunre.it.webstudyonline.model.dto.InforTeacherDto;
import com.hunre.it.webstudyonline.model.request.AddInforTeacherForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.ImageRepository;
import com.hunre.it.webstudyonline.repository.InforTeacherRepository;
import com.hunre.it.webstudyonline.service.IInforTeacherService;
import com.hunre.it.webstudyonline.service.UploadImageFile;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class IInforTeacherServiceImpl implements IInforTeacherService {

    @Autowired
    private InforTeacherMapper inforTeacherMapper;
    @Autowired
    private InforTeacherRepository inforTeacherRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private UploadImageFile imageFile;
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public ResponsePage<List<InforTeacherDto>> getAll(Pageable pageable) {
        ResponsePage<List<InforTeacherDto>> responsePage = new ResponsePage<>();
        Page<InforTeacherEntity> page = inforTeacherRepository.findAllInforTeachers(pageable);
        List<InforTeacherDto> inforTeacherDtos = page.getContent().stream().map(inforTeacherMapper::toInforTeacherDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(inforTeacherDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<InforTeacherDto> getInforTeacherById(String id) {
        BaseResponse<InforTeacherDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long teacherId = utils.getT();
        Optional<InforTeacherEntity> check = inforTeacherRepository.findById(teacherId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        InforTeacherEntity teacherEntity = check.get();
        InforTeacherDto inforTeacherDto = inforTeacherMapper.toInforTeacherDto(teacherEntity);

        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(inforTeacherDto);
        return response;
    }

    @Override
    public BaseResponse<InforTeacherDto> addInforTeacher(AddInforTeacherForm addInforTeacherForm) {
        BaseResponse<InforTeacherDto> response = new BaseResponse<>();
        InforTeacherEntity inforTeacherEntity = inforTeacherMapper.toInforTeacherEntity(addInforTeacherForm);
        inforTeacherEntity.setDeleted(false);
        InforTeacherEntity inforTeacherEntitySaved = inforTeacherRepository.save(inforTeacherEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(inforTeacherMapper.toInforTeacherDto(inforTeacherEntitySaved));
        return response;
    }

    @Override
    public BaseResponse<InforTeacherDto> updateInforTeacher(InforTeacherDto inforTeacherDto, String id, MultipartFile file) {
        BaseResponse<InforTeacherDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);

        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }

        Long teacherId = utils.getT();
        Optional<InforTeacherEntity> check = inforTeacherRepository.findById(teacherId);
        if (check.isEmpty()) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }

        InforTeacherEntity teacherEntity = check.get();
        AccountDto accountDto = inforTeacherDto.getAccountDto();
        if (accountDto == null || accountDto.getId() == null) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        AccountEntity account = accountRepository.findById(accountDto.getId()).orElse(null);
        account.setFullname(accountDto.getFullName());
        teacherEntity.setExperience(inforTeacherDto.getExperience());
        teacherEntity.setBirthday(inforTeacherDto.getBirthday().toString());
        teacherEntity.setAddress(inforTeacherDto.getAddress());
        teacherEntity.setAccount(account);
        accountRepository.save(account);
        inforTeacherRepository.save(teacherEntity);
        ImagesEntity images = imageRepository.findByAccountId(account.getId());
        if (file != null && !file.isEmpty()) {
            if (images != null) {
                imageFile.deleteImage(images.getPublicId());
            } else {
                images = new ImagesEntity();
                images.setAccountEntity(account);
            }
            try {
                ImageDto imageDTO = imageFile.uploadImage(file);
                images.setUrl(imageDTO.getUrl());
                images.setType(file.getContentType());
                images.setPublicId(imageDTO.getPublicId());
                imageRepository.save(images);
                accountDto.setImageUrl(images.getUrl());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else if (images != null) {
            accountDto.setImageUrl(images.getUrl());
        }

        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(inforTeacherMapper.toInforTeacherDto(teacherEntity));
        return response;
    }


    @Override
    public BaseResponse<InforTeacherDto> deleteInforTeacher(String id) {
        BaseResponse<InforTeacherDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long teacherId = utils.getT();
        Optional<InforTeacherEntity> check = inforTeacherRepository.findById(teacherId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        InforTeacherEntity teacherEntity = check.get();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(inforTeacherMapper.toInforTeacherDto(teacherEntity));
        teacherEntity.setDeleted(true);
        return response;
    }
}
