package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.TimeTableDto;
import com.hunre.it.webstudyonline.model.request.AddTimetableRequest;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.TimeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/timetable")
public class TimeTableController {
    @Autowired
    private TimeTableService timeTableService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<TimeTableDto>>> getAllTimeTable(Pageable pageable) {
        ResponsePage<List<TimeTableDto>> responsePage = timeTableService.getAllTimeTables(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @GetMapping("/getTimeTable/{gradeId}")
    public ResponseEntity<ResponsePage<List<TimeTableDto>>> getAllTimeTableByGrade(@PathVariable Long gradeId, Pageable pageable) {
        ResponsePage<List<TimeTableDto>> responsePage = timeTableService.getTimeTableByGradeId(gradeId,pageable);
        return ResponseEntity.ok(responsePage);
    }
    @PostMapping()
    public ResponseEntity<BaseResponse<List<TimeTableDto>>> addTimeTable(@RequestBody AddTimetableRequest AddTimetableRequest) throws ParseException {
        BaseResponse<List<TimeTableDto>> response = timeTableService.addTimeTable(AddTimetableRequest);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<TimeTableDto>> updateTimeTable(@PathVariable Long id, @RequestBody TimeTableDto timeTableDto) {
        BaseResponse<TimeTableDto> response = timeTableService.updateTimeTable(id, timeTableDto);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<TimeTableDto>> deleteTimeTable(@PathVariable Long id) {
        BaseResponse<TimeTableDto> response = timeTableService.deleteTimeTable(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<TimeTableDto>> findById(@PathVariable Long id) {
        BaseResponse<TimeTableDto> response = timeTableService.getTimeTableById(id);
        return ResponseEntity.ok(response);
    }
}
