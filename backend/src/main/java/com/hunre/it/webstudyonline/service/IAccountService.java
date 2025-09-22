package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.request.ChagePasswordRequest;
import com.hunre.it.webstudyonline.model.request.UpdateAccountForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IAccountService {
    ResponsePage<List<AccountDto>> getAllAccounts(Pageable pageable);
    ResponsePage<List<AccountDto>> findUserByCondition(Pageable pageable, String fullname, String email);
    ResponsePage<List<AccountDto>> findUserByRole(Pageable pageable, String fullname, String email,String roleCode);
    BaseResponse<AccountDto> update(String id, UpdateAccountForm updateAccountForm, MultipartFile file);
    BaseResponse<AccountDto> delete(String id);
    AccountDto findById(Long id);
    BaseResponse<AccountDto> getAccount();
    BaseResponse<?> changePassword(String id, ChagePasswordRequest chagePasswordRequest);
    ResponsePage<List<AccountDto>> findAccountByAttribute(String fullname,String email,String role,Pageable pageable);
}
