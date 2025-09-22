package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.entity.GradeEntity;
import com.hunre.it.webstudyonline.model.dto.GradeDto;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class GradeMapper {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private AccountMapper accountMapper;
    public GradeDto toDto(GradeEntity gradeEntity){
        GradeDto dto = new GradeDto();
        dto.setId(gradeEntity.getId());
        dto.setCode(gradeEntity.getCode());
        dto.setName(gradeEntity.getName());
        dto.setRemain_student(gradeEntity.getRemainStudent());
        dto.setNumber_student(gradeEntity.getNumber_student());
        dto.setStart_date(gradeEntity.getStart_date());
        dto.setCourse_id(gradeEntity.getCourseEntity().getId());
        dto.setStudy_date(gradeEntity.getStudy_date());
        dto.setStudy_time(gradeEntity.getStudy_time());
        dto.setCourse_name(gradeEntity.getCourseEntity().getName());
        Set<Long> accountEntities = gradeEntity.getAccounts().stream().map(AccountEntity::getId).collect(Collectors.toSet());
        dto.setAccountDto(
                gradeEntity.getAccounts()
                        .stream()
                        .map(accountMapper::toDto)
                        .collect(Collectors.toSet())
        );
        dto.setAccount_id(accountEntities);
        return dto;
    }
    public GradeEntity toEntity(GradeDto dto){
        GradeEntity gradeEntity = new GradeEntity();
        gradeEntity.setId(dto.getId());
        gradeEntity.setStart_date(dto.getStart_date());
        gradeEntity.setCode(dto.getCode());
        gradeEntity.setStudy_date( dto.getStudy_date());
        gradeEntity.setStudy_time(dto.getStudy_time());
        gradeEntity.setRemainStudent(dto.getRemain_student());
        gradeEntity.setName(dto.getName());
        gradeEntity.setNumber_student(dto.getNumber_student());
        CourseEntity courseEntity = courseRepository.findById(dto.getCourse_id()).orElseThrow(() -> new RuntimeException("Course not found"));
        gradeEntity.setCourseEntity(courseEntity);
        Set<AccountEntity> accountEntities = dto.getAccount_id().stream().map( accId -> accountRepository.findById(accId).orElseThrow(() -> new UsernameNotFoundException("account not found"))).collect(Collectors.toSet());
        gradeEntity.setAccounts(accountEntities);
        return gradeEntity;
    }
}
