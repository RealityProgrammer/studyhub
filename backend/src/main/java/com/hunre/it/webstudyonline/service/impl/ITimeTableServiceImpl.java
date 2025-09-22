package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.GradeEntity;
import com.hunre.it.webstudyonline.entity.TimetableEntity;
import com.hunre.it.webstudyonline.mapper.TimeTableMapper;
import com.hunre.it.webstudyonline.model.dto.TimeTableDto;
import com.hunre.it.webstudyonline.model.request.AddTimetableRequest;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.GradeRepository;
import com.hunre.it.webstudyonline.repository.TimeTableRepository;
import com.hunre.it.webstudyonline.service.ITimeTableService;
import com.hunre.it.webstudyonline.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;

@Service
public class ITimeTableServiceImpl implements ITimeTableService {
    @Autowired
    private TimeTableRepository timeTableRepository;
    @Autowired
    private TimeTableMapper timeTableMapper;
    @Autowired
    private GradeRepository gradeRepository;

    @Override
    public ResponsePage<List<TimeTableDto>> getAllTimeTables(Pageable pageable) {
        ResponsePage<List<TimeTableDto>> responsePage = new ResponsePage<>();
        Page<TimetableEntity> page = timeTableRepository.getAll(pageable);
        List<TimeTableDto> timeTableDtos = page.getContent().stream().map(timeTableMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(timeTableDtos);
        return responsePage;
    }

    @Override
    public ResponsePage<List<TimeTableDto>> getTimeTableByGradeId(Long gradeId, Pageable pageable) {
        ResponsePage<List<TimeTableDto>> responsePage = new ResponsePage<>();
        Page<TimetableEntity> page = timeTableRepository.getByGradeId(gradeId, pageable);
        List<TimeTableDto> timeTableDtos = page.getContent().stream().map(timeTableMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(timeTableDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<List<TimeTableDto>> addTimeTable(AddTimetableRequest addTimetableRequest) throws ParseException {
        BaseResponse<List<TimeTableDto>> response = new BaseResponse<>();
        List<TimetableEntity> timetableEntities = new ArrayList<>();
        Date start_date = addTimetableRequest.getStart_date();


        String[] studyDateArrayStr = addTimetableRequest.getStudy_date().split(",");
        List<Integer>  studyDateArray = new ArrayList<>();
        List<Integer>betweenDates = new ArrayList<>();
        for (String date : studyDateArrayStr) {
           studyDateArray.add(Integer.parseInt(date.trim()));
        }
        for (int i = 0; i < studyDateArray.size(); i++) {
            if (i==(studyDateArray.size()-1)){
               betweenDates.add( (7 - studyDateArray.get(studyDateArray.size()-1)) + studyDateArray.get(0) );
            }else {
                betweenDates.add(studyDateArray.get(i+1)-studyDateArray.get(i));
            }
        }
        Map<Integer,Integer> map = new HashMap<>();
        for (int i = 0; i < studyDateArray.size(); i++) {
            map.put(studyDateArray.get(i),betweenDates.get(i));
        }
        Date nextDate =start_date;
        Long gradeId = addTimetableRequest.getGradeId();
        GradeEntity gradeEntity = gradeRepository.findById(gradeId).orElseThrow(() -> new RuntimeException(Constant.HTTP_MESSAGE.NOTFOUND));
        for (int i = 1; i <= addTimetableRequest.getCourseDetailsDto().size(); i++) {
            TimetableEntity timetableEntity = new TimetableEntity();
            timetableEntity.setDate(nextDate);
            timetableEntity.setName(addTimetableRequest.getCourseDetailsDto().get(i-1).getName());
            timetableEntity.setPeriod(addTimetableRequest.getCourseDetailsDto().get(i-1).getPeriod());
            timetableEntity.setGradeEntity(gradeEntity);
            timetableEntity.setDeleted(false);
            timetableEntity.setUrl(addTimetableRequest.getUrl());
            timetableEntity.setTime(addTimetableRequest.getStudy_time());
            timetableEntities.add(timeTableRepository.save(timetableEntity));
            System.out.println(timetableEntity);
            nextDate =    calculateNextDate(nextDate,map);

        }

        List<TimeTableDto> timeTableDtos = timetableEntities.stream().map(timeTableMapper::toDto).toList();
        response.setData(timeTableDtos);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    private Date calculateNextDate(Date date,Map<Integer,Integer> map) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        int value = map.get(dayOfWeek);
        calendar.add(Calendar.DAY_OF_MONTH, value);
        return calendar.getTime();
    }


    @Override
    public BaseResponse<TimeTableDto> updateTimeTable(Long id, TimeTableDto timeTableDto) {
        BaseResponse<TimeTableDto> response = new BaseResponse<>();
        Optional<TimetableEntity> optional = timeTableRepository.findById(id);
        if (optional.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        Optional<GradeEntity> grade = gradeRepository.findById(timeTableDto.getGradeId());
        if (grade.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        TimetableEntity timetableEntity = optional.get();
        timetableEntity.setGradeEntity(grade.get());
        timetableEntity.setName(timeTableDto.getName());
        timetableEntity.setPeriod(timeTableDto.getPeriod());
        timetableEntity.setUrl(timeTableDto.getUrl());
        timetableEntity.setDate(timeTableDto.getDate());
        timetableEntity.setDeleted(false);
        timetableEntity = timeTableRepository.save(timetableEntity);
        response.setData(timeTableMapper.toDto(timetableEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<TimeTableDto> deleteTimeTable(Long id) {
        BaseResponse<TimeTableDto> response = new BaseResponse<>();
        Optional<TimetableEntity> optional = timeTableRepository.findById(id);
        if (optional.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        TimetableEntity tEntity = optional.get();
        tEntity.setDeleted(true);
        timeTableRepository.save(tEntity);
        response.setData(timeTableMapper.toDto(tEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<TimeTableDto> getTimeTableById(Long id) {
        BaseResponse<TimeTableDto> response = new BaseResponse<>();
        Optional<TimetableEntity> optional = timeTableRepository.findById(id);
        if (optional.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        response.setData(timeTableMapper.toDto(optional.get()));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }
}
