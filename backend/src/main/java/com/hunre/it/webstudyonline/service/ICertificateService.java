package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.CertificateDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICertificateService {
    ResponsePage<List<CertificateDto>> getAllCertificates(Pageable pageable);
    BaseResponse<CertificateDto> addCertificate(CertificateDto certificateDto);
    BaseResponse<CertificateDto> updateCertificate(String id,CertificateDto certificateDto);
    BaseResponse<CertificateDto> deleteCertificate(String id);
    BaseResponse<CertificateDto> getCertificateById(String id);
    ResponsePage<List<CertificateDto>> findByCertificateAttribute(String certificateName,String issuingOrganization,String certificateType,String certificateNumber,Pageable pageable);
    ResponsePage<List<CertificateDto>> findCertificateByEmail(Pageable pageable);
}
