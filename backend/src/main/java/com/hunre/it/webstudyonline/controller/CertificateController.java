package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.CertificateDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.CertificateService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificate")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class CertificateController {
    @Autowired
    private CertificateService certificateService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<CertificateDto>>> getAll(Pageable pageable) {
        ResponsePage<List<CertificateDto>> responsePage = certificateService.getAllCertificates(pageable);
        return ResponseEntity.ok(responsePage);
    }
    @PostMapping("/create")
    public ResponseEntity<BaseResponse<CertificateDto>> create(@Valid @RequestBody CertificateDto certificate) {
        BaseResponse<CertificateDto> category = certificateService.addCertificate(certificate);
        return ResponseEntity.ok(category);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<CertificateDto>> update(@Valid @RequestBody CertificateDto certificate, @PathVariable String id) {
        BaseResponse<CertificateDto> category = certificateService.updateCertificate(id, certificate);
        return ResponseEntity.ok(category);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<CertificateDto>> getById(@PathVariable String id) {
        BaseResponse<CertificateDto> category = certificateService.getCertificateById(id);
        return ResponseEntity.ok(category);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<CertificateDto>> delete(@PathVariable String id) {
        BaseResponse<CertificateDto> baseResponse = certificateService.deleteCertificate(id);
        return ResponseEntity.ok(baseResponse);
    }
    @GetMapping("/findByAttribute")
    public ResponseEntity<ResponsePage<List<CertificateDto>>> findCertificates(
            @RequestParam(required = false) String certificateName,
            @RequestParam(required = false) String issuingOrganization,
            @RequestParam(required = false) String certificateType,
            @RequestParam(required = false) String certificateNumber,
            Pageable pageable) {
        ResponsePage<List<CertificateDto>> response = certificateService.findByCertificateAttribute(
                certificateName, issuingOrganization, certificateType, certificateNumber, pageable);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findCertificateByEmail")
    public ResponseEntity<ResponsePage<List<CertificateDto>>> findCertificatesByEmail(Pageable pageable) {
        ResponsePage<List<CertificateDto>> responsePage = certificateService.findCertificateByEmail(pageable);
        return ResponseEntity.ok(responsePage);
    }
}
