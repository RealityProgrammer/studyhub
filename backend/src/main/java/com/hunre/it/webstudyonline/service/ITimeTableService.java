package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.TimeTableDto;
import com.hunre.it.webstudyonline.model.request.AddTimetableRequest;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface ITimeTableService {
    ResponsePage<List<TimeTableDto>> getAllTimeTables(Pageable pageable);
    ResponsePage<List<TimeTableDto>> getTimeTableByGradeId(Long gradeId, Pageable pageable);
    BaseResponse<List<TimeTableDto>> addTimeTable(AddTimetableRequest addTimetableRequest) throws ParseException;
    BaseResponse<TimeTableDto> updateTimeTable(Long id,TimeTableDto timeTableDto);
    BaseResponse<TimeTableDto> deleteTimeTable(Long id);
    BaseResponse<TimeTableDto> getTimeTableById(Long id);
}
