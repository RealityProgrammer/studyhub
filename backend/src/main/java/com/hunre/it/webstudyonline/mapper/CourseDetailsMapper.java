package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.CourseDetailsEntity;
import com.hunre.it.webstudyonline.model.dto.CourseDetailsDto;
import org.springframework.stereotype.Component;

@Component
public class CourseDetailsMapper {
    public CourseDetailsDto toDto(CourseDetailsEntity courseDetailsEntity){
        CourseDetailsDto courseDetailsDto = new CourseDetailsDto();
        courseDetailsDto.setId(courseDetailsEntity.getId());
        courseDetailsDto.setName(courseDetailsEntity.getName());
        courseDetailsDto.setDescription(courseDetailsEntity.getDescription());
        courseDetailsDto.setPeriod(courseDetailsEntity.getPeriod());
        courseDetailsDto.setUrl(courseDetailsEntity.getUrl());
        courseDetailsDto.setCourseId(courseDetailsEntity.getCourseEntity().getId());
        return courseDetailsDto;
    }

    public CourseDetailsEntity toEntity(CourseDetailsDto courseDetailsDto){
        CourseDetailsEntity courseDetailsEntity = new CourseDetailsEntity();
        courseDetailsEntity.setName(courseDetailsDto.getName());
        courseDetailsEntity.setDescription(courseDetailsDto.getDescription());
        courseDetailsEntity.setPeriod(courseDetailsDto.getPeriod());
        courseDetailsEntity.setUrl(courseDetailsDto.getUrl());
        return courseDetailsEntity;
    }
}
