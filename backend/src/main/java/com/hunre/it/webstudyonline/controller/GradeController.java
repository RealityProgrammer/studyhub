package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.GradeDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/grade")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class GradeController {
    @Autowired
    private IGradeService iGradeService;
    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<GradeDto>>> getAllGrades(Pageable pageable) {
        ResponsePage<List<GradeDto>> responsePage = iGradeService.getAllGrades(pageable);
        return ResponseEntity.ok(responsePage);
    }
    @PostMapping
    public ResponseEntity<BaseResponse<GradeDto>> create(@Valid @RequestBody GradeDto gradeDto) throws ParseException {
        BaseResponse<GradeDto> response = iGradeService.addGrade(gradeDto);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<GradeDto>> update(@Valid @RequestBody GradeDto gradeDto, @PathVariable String id){
        BaseResponse<GradeDto> response = iGradeService.updateGrade(id, gradeDto);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<GradeDto>> getById(@PathVariable String id){
        BaseResponse<GradeDto> response = iGradeService.getGradeById(id);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<GradeDto>> delete(@PathVariable String id){
        BaseResponse<GradeDto> response = iGradeService.deleteGrade(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getByEmail")
    public ResponseEntity<BaseResponse<List<GradeDto>>> getByEmail(){
        BaseResponse<List<GradeDto>> response = iGradeService.getGradeByEmail();
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findByCourse")
    public ResponseEntity<BaseResponse<List<GradeDto>>> findByCourse(@RequestParam String id){
        BaseResponse<List<GradeDto>> response = iGradeService.findByCourse(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findByCourseAndUser")
    public ResponseEntity<BaseResponse<GradeDto>> findByCourseAndUser(@RequestParam String id){
        BaseResponse<GradeDto> response = iGradeService.findByCourseAndUser(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findByUser")
    public ResponseEntity<ResponsePage<List<GradeDto>>> findByEmail(Pageable pageable){
        ResponsePage<List<GradeDto>> response = iGradeService.findByEmail(pageable);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/signInGrade/{id}")
    public ResponseEntity<BaseResponse<String>> signInGrade(@PathVariable String id){
        BaseResponse<String> response = iGradeService.signInGrade(id);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/addStudentIntoGrade/{id}")
    public ResponseEntity<BaseResponse<String>> addStudentIntoGrade(@PathVariable String id,@RequestBody List<String> studentEmails){
        BaseResponse<String> response = iGradeService.addStudentIntoGrade(id,studentEmails);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/deleteStudentOuttoGrade/{id}/{studentEmail}")
    public ResponseEntity<BaseResponse<String>> deleteStudentOuttoGrade(@PathVariable String id,@PathVariable String studentEmail){
        BaseResponse<String> response = iGradeService.deleteStudentOuttoGrade(id,studentEmail);
        return ResponseEntity.ok(response);
    }
}
