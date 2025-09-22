package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.CourseDetailsEntity;
import com.hunre.it.webstudyonline.entity.GradeEntity;
import com.hunre.it.webstudyonline.mapper.CourseDetailsMapper;
import com.hunre.it.webstudyonline.mapper.GradeMapper;
import com.hunre.it.webstudyonline.model.dto.CourseDetailsDto;
import com.hunre.it.webstudyonline.model.dto.GradeDto;
import com.hunre.it.webstudyonline.model.dto.auth.AuthDto;
import com.hunre.it.webstudyonline.model.request.AddTimetableRequest;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.CourseDetailsRepository;
import com.hunre.it.webstudyonline.repository.GradeRepository;
import com.hunre.it.webstudyonline.security.service.JwtService;
import com.hunre.it.webstudyonline.service.IGradeService;
import com.hunre.it.webstudyonline.service.ITimeTableService;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.GenerateCode;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class IGradeServiceImpl implements IGradeService {
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private GradeMapper gradeMapper;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CourseDetailsRepository courseDetailsRepository;
    @Autowired
    private CourseDetailsMapper courseDetailsMapper;
    @Autowired
    private ITimeTableService timeTableService;
    @Override
    public ResponsePage<List<GradeDto>> getAllGrades(Pageable pageable) {
        ResponsePage<List<GradeDto>> responsePage = new ResponsePage<>();
        Page<GradeEntity> page = gradeRepository.getGrade(pageable);
        List<GradeDto> gradeDtos = page.getContent().stream().map(gradeMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements((page.getTotalElements()));
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(gradeDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<GradeDto> getGradeById(String id) {
        BaseResponse<GradeDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if(utils.getT() == null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long gradeId = utils.getT();
        Optional<GradeEntity> grade = gradeRepository.findById(gradeId);
        if(grade.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        GradeDto gradeDto = gradeMapper.toDto(grade.get());
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(gradeDto);

        return response;
    }

    @Override
    public BaseResponse<GradeDto> addGrade(GradeDto gradeDto) throws ParseException {
        BaseResponse<GradeDto> response = new BaseResponse<>();
        GradeEntity gradeEntity = gradeMapper.toEntity(gradeDto);
        gradeEntity.setDeleted(false);
        gradeEntity.setRemainStudent(gradeDto.getNumber_student());
        gradeEntity.setCode(GenerateCode.generateUniqueCode("GR"));
        GradeEntity gradeEntity1 = gradeRepository.save(gradeEntity);

        response.setData(gradeMapper.toDto(gradeEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.CREATED.value());

        List<CourseDetailsEntity> courseDetailsEntities = courseDetailsRepository.findByCourseId(gradeEntity1.getCourseEntity().getId());
        List<CourseDetailsDto> courseDetailsDtos = courseDetailsEntities.stream().map(courseDetailsMapper::toDto).toList();

        AddTimetableRequest addTimetableRequest = new AddTimetableRequest();
        addTimetableRequest.setStart_date(gradeEntity1.getStart_date());
        addTimetableRequest.setStudy_time(gradeEntity1.getStudy_time());
        addTimetableRequest.setStudy_date(gradeEntity1.getStudy_date());
        addTimetableRequest.setCourseDetailsDto(courseDetailsDtos);
        addTimetableRequest.setGradeId(gradeEntity1.getId());
        addTimetableRequest.setUrl("http://localhost:3002/react-rtc-demo");
        timeTableService.addTimeTable(addTimetableRequest);
        return response;
    }

    @Override
    public BaseResponse<GradeDto> updateGrade(String id, GradeDto gradeDto) {
        BaseResponse<GradeDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long gradeId = utils.getT();
        Optional<GradeEntity> grade = gradeRepository.findById(gradeId);
        if (grade.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Grade Not Found");
            return response;
        }
        GradeEntity gradeEntity = gradeMapper.toEntity(gradeDto);
        gradeEntity.setDeleted(false);
        gradeEntity.setId(gradeId);
        gradeRepository.save(gradeEntity);
        response.setData(gradeMapper.toDto(gradeEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<GradeDto> deleteGrade(String id) {
        BaseResponse<GradeDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long gradeId = utils.getT();
        Optional<GradeEntity> grade = gradeRepository.findById(gradeId);
        if (grade.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Grade Not Found");
            return response;
        }
        GradeEntity gradeEntity = grade.get();
        gradeEntity.setDeleted(true);
        gradeRepository.save(gradeEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(gradeMapper.toDto(gradeEntity));
        return response;
    }

    @Override
    public BaseResponse<List<GradeDto>> getGradeByEmail() {
        BaseResponse<List<GradeDto>> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        List<GradeEntity> gradeEntities = accountRepository.findGradesByEmail(email);
        List<GradeDto> gradeDtos = gradeEntities.stream().map(gradeMapper::toDto).toList();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(gradeDtos);
        return response;
    }

    @Override
    public BaseResponse<List<GradeDto>> findByCourse(String id) {
        BaseResponse<List<GradeDto>> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long courseId = utils.getT();
        List<GradeEntity> gradeEntities = gradeRepository.findByCourseId(courseId);
        List<GradeDto> gradeDtos=gradeEntities.stream().map(gradeMapper::toDto).toList();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(gradeDtos);
        return response;
    }

    @Override
    public BaseResponse<String> signInGrade(String id) {
        BaseResponse<String> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long courseId = utils.getT();
        AuthDto authDto=jwtService.decodeToken();
        AccountEntity accountEntity = accountRepository.findByEmail(authDto.getEmail()).orElseThrow(()->new RuntimeException(Constant.HTTP_MESSAGE.NOTFOUND));
        GradeEntity gradeEntity= gradeRepository.findById(courseId).orElseThrow(()->new RuntimeException(Constant.HTTP_MESSAGE.NOTFOUND));
        if (gradeEntity.getRemainStudent()<0){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            response.setData("");
            return response;
        }
        gradeEntity.getAccounts().add(accountEntity);
        gradeEntity.setRemainStudent(gradeEntity.getRemainStudent()-1);
        gradeRepository.save(gradeEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData("Đăng kí thành công");
        return response;
    }

    @Override
    public BaseResponse<String> addStudentIntoGrade(String id, List<String> studentEmails) {
        BaseResponse<String> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long courseId = utils.getT();
        GradeEntity gradeEntity= gradeRepository.findById(courseId).orElseThrow(()->new RuntimeException(Constant.HTTP_MESSAGE.NOTFOUND));
        if (gradeEntity.getRemainStudent()<0){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            response.setData("");
            return response;
        }
        for(String studentEmail : studentEmails){
            AccountEntity accountEntity = accountRepository.findByEmail(studentEmail).orElseThrow(()->new RuntimeException(Constant.HTTP_MESSAGE.NOTFOUND));
            gradeEntity.getAccounts().add(accountEntity);
        }
        gradeEntity.setRemainStudent(gradeEntity.getRemainStudent()-1);
        gradeRepository.save(gradeEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData("Thêm thành công");
        return response;
    }

    @Override
    public BaseResponse<String> deleteStudentOuttoGrade(String id, String studentEmail) {
        BaseResponse<String> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long courseId = utils.getT();
        AccountEntity accountEntity = accountRepository.findByEmail(studentEmail).orElseThrow(()->new RuntimeException(Constant.HTTP_MESSAGE.NOTFOUND));
        GradeEntity gradeEntity= gradeRepository.findById(courseId).orElseThrow(()->new RuntimeException(Constant.HTTP_MESSAGE.NOTFOUND));
        if (gradeEntity.getRemainStudent()<0){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            response.setData("");
            return response;
        }
        gradeEntity.getAccounts().remove(accountEntity);
        gradeEntity.setRemainStudent(gradeEntity.getRemainStudent()-1);
        gradeRepository.save(gradeEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData("Xóa thành công");
        return response;
    }

    @Override
    public BaseResponse<GradeDto> findByCourseAndUser(String id) {
        BaseResponse<GradeDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long courseId = utils.getT();
        AuthDto authDto = jwtService.decodeToken();
        GradeEntity gradeEntity = gradeRepository.findByCourseIdandEmail(courseId,authDto.getEmail());
        GradeDto gradeDto=gradeMapper.toDto(gradeEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(gradeDto);
        return response;
    }

    @Override
    public ResponsePage<List<GradeDto>> findByEmail(Pageable pageable) {
        ResponsePage<List<GradeDto>> responsePage = new ResponsePage<>();
        AuthDto authDto = jwtService.decodeToken();
        Page<GradeEntity> page = gradeRepository.findByEmail(authDto.getEmail(),pageable);;
        List<GradeDto> gradeDtos = page.getContent().stream().map(gradeMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements((page.getTotalElements()));
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(gradeDtos);
        return responsePage;
    }
}
