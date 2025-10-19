package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.PointDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/point")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class PointController {
    @Autowired
    private IPointService pointService;
    @GetMapping("/list/{examId}")
    public ResponseEntity<ResponsePage<List<PointDto>>> getAll(@PathVariable Long examId,Pageable pageable) {
        ResponsePage<List<PointDto>> responsePage = pointService.getAllPoints(examId,pageable);
        return ResponseEntity.ok(responsePage);
    }
    @PostMapping("/add")
    public ResponseEntity<BaseResponse<PointDto>> create(@Valid @RequestBody PointDto pointDto) {
        BaseResponse<PointDto> category = pointService.addPoint(pointDto);
        return ResponseEntity.ok(category);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<PointDto>> update(@Valid @RequestBody PointDto pointDto, @PathVariable String id) {
        BaseResponse<PointDto> category = pointService.updatePoint(id, pointDto);
        return ResponseEntity.ok(category);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<PointDto>> getById(@PathVariable String id) {
        BaseResponse<PointDto> category = pointService.getPoint(id);
        return ResponseEntity.ok(category);
    }
    @GetMapping("/findByUser")
    public ResponseEntity<ResponsePage<List<PointDto>>> findByUser(Pageable pageable) {
        ResponsePage<List<PointDto>> responsePage = pointService.findByUser(pageable);
        return ResponseEntity.ok(responsePage);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<PointDto>> delete(@PathVariable String id) {
        BaseResponse<PointDto> baseResponse = pointService.deletePoint(id);
        return ResponseEntity.ok(baseResponse);
    }
}
