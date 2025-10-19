package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.InforTeacherDto;
import com.hunre.it.webstudyonline.model.request.AddInforTeacherForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.InforTeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/inforTeacher")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class InforTeacherController {
    @Autowired
    private InforTeacherService inforTeacherService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<InforTeacherDto>>> getAll(Pageable pageable) {
        ResponsePage<List<InforTeacherDto>> responsePage = inforTeacherService.getAll(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @PostMapping("/add")
    public ResponseEntity<BaseResponse<InforTeacherDto>> addInforTeacher(@RequestBody AddInforTeacherForm addInforTeacherForm){
        BaseResponse<InforTeacherDto> response = inforTeacherService.addInforTeacher(addInforTeacherForm);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<InforTeacherDto>> updateInforTeacher(@ModelAttribute InforTeacherDto inforTeacherDto,@PathVariable String id,@RequestParam(value = "file", required = false) MultipartFile file){
        BaseResponse<InforTeacherDto> response = inforTeacherService.updateInforTeacher(inforTeacherDto, id, file);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<InforTeacherDto>> deleteInforTeacher(@PathVariable String id){
        BaseResponse<InforTeacherDto> response = inforTeacherService.deleteInforTeacher(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity<BaseResponse<InforTeacherDto>>  getInforTeacher(@PathVariable String id){
        BaseResponse<InforTeacherDto> response = inforTeacherService.getInforTeacherById( id);
        return ResponseEntity.ok(response);
    }
}
