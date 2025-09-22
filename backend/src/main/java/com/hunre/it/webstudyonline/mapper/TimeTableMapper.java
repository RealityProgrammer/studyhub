package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.TimetableEntity;
import com.hunre.it.webstudyonline.model.dto.TimeTableDto;
import com.hunre.it.webstudyonline.repository.GradeRepository;
import com.hunre.it.webstudyonline.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class TimeTableMapper {
    @Autowired
    private GradeRepository gradeRepository;
    public TimeTableDto toDto(TimetableEntity timetableEntity) {
        TimeTableDto timeTableDto = new TimeTableDto();
        timeTableDto.setId(timetableEntity.getId());
        timeTableDto.setName(timetableEntity.getName());
        timeTableDto.setPeriod(timetableEntity.getPeriod());
        timeTableDto.setDate(timetableEntity.getDate());
        timeTableDto.setUrl(timetableEntity.getUrl());
        timeTableDto.setTime(timetableEntity.getTime());
        timeTableDto.setGradeId(timetableEntity.getGradeEntity().getId());
        timeTableDto.setGradeName(timetableEntity.getGradeEntity().getName());
        return timeTableDto;
    }
    public TimetableEntity toEntity(TimeTableDto timeTableDto) {
        TimetableEntity timetableEntity = new TimetableEntity();
        timetableEntity.setId(timeTableDto.getId());
        timetableEntity.setName(timeTableDto.getName());
        timetableEntity.setPeriod(timeTableDto.getPeriod());
        timetableEntity.setDate(timeTableDto.getDate());
        timetableEntity.setTime(timeTableDto.getTime());
        timetableEntity.setUrl(timeTableDto.getUrl());
        return timetableEntity;
    }
}
