package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.CertificateDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.ICertificateService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificate")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ApiCertificate {
    @Autowired
    private ICertificateService iCertificateService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<CertificateDto>>> getAll(Pageable pageable) {
        ResponsePage<List<CertificateDto>> responsePage = iCertificateService.getAllCertificates(pageable);
        return ResponseEntity.ok(responsePage);
    }
    @PostMapping("/create")
    public ResponseEntity<BaseResponse<CertificateDto>> create(@Valid @RequestBody CertificateDto certificate) {
        BaseResponse<CertificateDto> category = iCertificateService.addCertificate(certificate);
        return ResponseEntity.ok(category);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<CertificateDto>> update(@Valid @RequestBody CertificateDto certificate, @PathVariable String id) {
        BaseResponse<CertificateDto> category = iCertificateService.updateCertificate(id, certificate);
        return ResponseEntity.ok(category);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<CertificateDto>> getById(@PathVariable String id) {
        BaseResponse<CertificateDto> category = iCertificateService.getCertificateById(id);
        return ResponseEntity.ok(category);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<CertificateDto>> delete(@PathVariable String id) {
        BaseResponse<CertificateDto> baseResponse = iCertificateService.deleteCertificate(id);
        return ResponseEntity.ok(baseResponse);
    }
    @GetMapping("/findByAttribute")
    public ResponseEntity<ResponsePage<List<CertificateDto>>> findCertificates(
            @RequestParam(required = false) String certificateName,
            @RequestParam(required = false) String issuingOrganization,
            @RequestParam(required = false) String certificateType,
            @RequestParam(required = false) String certificateNumber,
            Pageable pageable) {
        ResponsePage<List<CertificateDto>> response = iCertificateService.findByCertificateAttribute(
                certificateName, issuingOrganization, certificateType, certificateNumber, pageable);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findCertificateByEmail")
    public ResponseEntity<ResponsePage<List<CertificateDto>>> findCertificatesByEmail(Pageable pageable) {
        ResponsePage<List<CertificateDto>> responsePage = iCertificateService.findCertificateByEmail(pageable);
        return ResponseEntity.ok(responsePage);
    }
}
