package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.ExamDetailsEntity;
import com.hunre.it.webstudyonline.model.dto.ExamDetailsDto;
import org.springframework.stereotype.Component;

@Component
public class ExamDetailsMapper {
    public ExamDetailsDto toDto(ExamDetailsEntity examDetailsEntity) {
        ExamDetailsDto examDetailsDto = new ExamDetailsDto();
        examDetailsDto.setId(examDetailsEntity.getId());
        examDetailsDto.setName(examDetailsEntity.getName());
        examDetailsDto.setAnswer(examDetailsEntity.getAnswer());
        examDetailsDto.setDescription(examDetailsEntity.getDescription());
        examDetailsDto.setUrl(examDetailsEntity.getUrl());
        examDetailsDto.setExamId(examDetailsEntity.getExamEntity().getId());
        return examDetailsDto;
    }
    public ExamDetailsEntity toEntity(ExamDetailsDto examDetailsDto) {
        ExamDetailsEntity examDetailsEntity = new ExamDetailsEntity();
        examDetailsEntity.setId(examDetailsDto.getId());
        examDetailsEntity.setName(examDetailsDto.getName());
        examDetailsEntity.setAnswer(examDetailsDto.getAnswer());
        examDetailsEntity.setDescription(examDetailsDto.getDescription());
        examDetailsEntity.setUrl(examDetailsDto.getUrl());
        return examDetailsEntity;
    }
}
