package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.BillDetailsEntity;
import com.hunre.it.webstudyonline.entity.BillEntity;
import com.hunre.it.webstudyonline.mapper.BillMapper;
import com.hunre.it.webstudyonline.model.dto.BillDto;
import com.hunre.it.webstudyonline.model.dto.auth.AuthDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.BillDetailsRepository;
import com.hunre.it.webstudyonline.repository.BillRepository;
import com.hunre.it.webstudyonline.security.service.JwtService;
import com.hunre.it.webstudyonline.service.IBillService;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.GenerateCode;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IBillServiceImpl implements IBillService {
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private BillMapper billMapper;
    @Autowired
    private BillDetailsRepository billDetailsRepository;
    @Autowired
    private JwtService jwtService;
    @Override
    public ResponsePage<List<BillDto>> getAll(Pageable pageable) {
        ResponsePage<List<BillDto>> responsePage = new ResponsePage<>();
        Page<BillEntity> page = billRepository.findAllByDeletedFalse(pageable);
        List<BillDto> billDtos = page.getContent().stream().map(billMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(billDtos);
        return responsePage;
    }

    @Override
    public ResponsePage<List<BillDto>> getBillByAttribute(String code, String accountName, Pageable pageable) {
        ResponsePage<List<BillDto>> responsePage = new ResponsePage<>();
        Page<BillEntity> page = billRepository.findBillByCodeAndAccountName(code, accountName, pageable);
        List<BillDto> billDtos = page.getContent().stream().map(billMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(billDtos);
        return responsePage;
    }

    @Override
    public ResponsePage<List<BillDto>> getBillByEmail(Pageable pageable) {
        ResponsePage<List<BillDto>> responsePage = new ResponsePage<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Page<BillEntity> page = billRepository.findAllByEmail(email,pageable);
        List<BillDto> billDtos = page.getContent().stream().map(billMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(billDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<BillDto> createBill(BillDto billDto) {
        BaseResponse<BillDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        BillEntity billEntity = billMapper.toEntity(email,billDto);
        billEntity.setCode(GenerateCode.generateUniqueCode("BILL"));
        billEntity.setDeleted(false);
        billRepository.save(billEntity);
        response.setData(billMapper.toDto(billEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.CREATED.value());
        return response;
    }

    @Override
    public BaseResponse<BillDto> getById(String id) {
        BaseResponse<BillDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long billId = utils.getT();
        Optional<BillEntity> bill = billRepository.findById(billId);
        if (bill.isEmpty()) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        BillEntity billEntity = bill.get();
        BillDto dto = billMapper.toDto(billEntity);
        response.setData(dto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<BillDto> deleteById(String id) {
        BaseResponse<BillDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long billId = utils.getT();
        Optional<BillEntity> bill = billRepository.findById(billId);
        if (bill.isEmpty()) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        BillEntity billEntity = bill.get();
        billEntity.setDeleted(true);
        billEntity = billRepository.save(billEntity);

        List<BillDetailsEntity> list = billDetailsRepository.findByBillId(billId).stream().map(billDetailsEntity -> {
            billDetailsEntity.setDeleted(true);
            return billDetailsEntity;
        }).toList();
        billDetailsRepository.saveAll(list);
        BillDto dto = billMapper.toDto(billEntity);
        response.setData(dto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }
}
