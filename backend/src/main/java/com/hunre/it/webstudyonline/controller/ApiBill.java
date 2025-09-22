package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.BillDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.IBillService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bill")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ApiBill {
    @Autowired
    private IBillService iBillService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<BillDto>>> getAll(Pageable pageable) {
        ResponsePage<List<BillDto>> responsePage = iBillService.getAll(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @GetMapping("/findBillByAttribute")
    public ResponseEntity<ResponsePage<List<BillDto>>> getBillByAttribute(
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String accountName,
            Pageable pageable) {
        ResponsePage<List<BillDto>> responsePage = iBillService.getBillByAttribute(code,accountName,pageable);
        return ResponseEntity.ok(responsePage);
    }

    @GetMapping("/getBillByEmail")
    public ResponseEntity<ResponsePage<List<BillDto>>> getBillByEmail(Pageable pageable) {
        ResponsePage<List<BillDto>> responsePage = iBillService.getBillByEmail(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @PostMapping("/create")
    public ResponseEntity<BaseResponse<BillDto>> create(@Valid @RequestBody BillDto billDto) {
        BaseResponse<BillDto> bill = iBillService.createBill(billDto);
        return ResponseEntity.ok(bill);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<BillDto>> getById(@PathVariable String id) {
        BaseResponse<BillDto> category = iBillService.getById(id);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<BillDto>> delete(@PathVariable String id) {
        BaseResponse<BillDto> baseResponse = iBillService.deleteById(id);
        return ResponseEntity.ok(baseResponse);
    }
}
