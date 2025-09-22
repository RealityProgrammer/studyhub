package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.BillDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBillService {
    ResponsePage<List<BillDto>> getAll(Pageable pageable);
    ResponsePage<List<BillDto>> getBillByAttribute(String code, String accountName, Pageable pageable);
    ResponsePage<List<BillDto>> getBillByEmail(Pageable pageable);
    BaseResponse<BillDto> createBill(BillDto billDto);
    BaseResponse<BillDto> getById(String id);
    BaseResponse<BillDto> deleteById(String id);
}
