package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.ExamDetailsDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.ExamDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam_details")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ExamDetailsController {
    @Autowired
    private ExamDetailsService iExamDetailsService;
    @GetMapping("/list/{id}")
    public ResponseEntity<ResponsePage<List<ExamDetailsDto>>> getAllExamDetails(@PathVariable String id, Pageable pageable) {
        ResponsePage<List<ExamDetailsDto>> response = iExamDetailsService.getAllExamDetails(id,pageable );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create")
    public ResponseEntity<BaseResponse<ExamDetailsDto>> createExamDetails(@RequestBody ExamDetailsDto examDetailsDto) {
        BaseResponse<ExamDetailsDto> response = iExamDetailsService.addExamDetails(examDetailsDto);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<ExamDetailsDto>> updateExamDetails(@RequestBody ExamDetailsDto examDetailsDto, @PathVariable String id) {
        BaseResponse<ExamDetailsDto> response = iExamDetailsService.updateExamDetails(id, examDetailsDto);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<ExamDetailsDto>> deleteExamDetails(@PathVariable String id) {
        BaseResponse<ExamDetailsDto> response = iExamDetailsService.deleteExamDetails(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<ExamDetailsDto>> getExamDetails(@PathVariable String id) {
        BaseResponse<ExamDetailsDto> response = iExamDetailsService.getExamDetails(id);
        return ResponseEntity.ok(response);
    }

}
