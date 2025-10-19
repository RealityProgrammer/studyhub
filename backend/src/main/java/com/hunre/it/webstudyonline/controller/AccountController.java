package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.request.ChagePasswordRequest;
import com.hunre.it.webstudyonline.model.request.UpdateAccountForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<AccountDto>>> getAll(Pageable pageable) {
        ResponsePage<List<AccountDto>> responsePage = accountService.getAllAccounts(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @GetMapping("/findByCondition")
    public ResponseEntity<ResponsePage<List<AccountDto>>> findByCondition( @RequestParam(value = "name") String name, Pageable pageable, @RequestParam String email) {
        ResponsePage<List<AccountDto>> respondPage = accountService.findUserByCondition(pageable,name,email);
        return ResponseEntity.ok(respondPage);
    }

    @GetMapping("/findByAttribute")
    public ResponseEntity<ResponsePage<List<AccountDto>>> findByAttributes( @RequestParam(value = "fullname") String fullname, @RequestParam String email,@RequestParam("role") String role,Pageable pageable) {
        ResponsePage<List<AccountDto>> respondPage = accountService.findAccountByAttribute(fullname,email,role,pageable);
        return ResponseEntity.ok(respondPage);
    }

    @GetMapping("/findByRole")
    public ResponseEntity<ResponsePage<List<AccountDto>>> findByRole( @RequestParam(value = "name", required = false) String name, Pageable pageable, @RequestParam(value = "email" , required = false) String email,@RequestParam(value = "roleCode" , required = false) String roleCode) {
        ResponsePage<List<AccountDto>> respondPage = accountService.findUserByRole(pageable,name,email,roleCode);
        return ResponseEntity.ok(respondPage);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<AccountDto>> update(@ModelAttribute @Valid UpdateAccountForm updateAccountForm, @PathVariable String id, @RequestParam(value = "file",required = false) MultipartFile file) {
        BaseResponse<AccountDto> response = accountService.update(id, updateAccountForm,file);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<AccountDto>> delete(@PathVariable String id) {
        BaseResponse<AccountDto> response = accountService.delete(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getUser")
    public ResponseEntity<BaseResponse<AccountDto>> getCurrentUser() {
        BaseResponse<AccountDto> response = accountService.getAccount();
        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response);
        }
    }
    @PutMapping("/updatePassWord/{id}")
    public ResponseEntity<BaseResponse<?>> updatePass(@PathVariable String id, @RequestBody ChagePasswordRequest chagePasswordRequest) {
        BaseResponse<?> response = accountService.changePassword(id, chagePasswordRequest);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<AccountDto> findById(@PathVariable Long id) {
        AccountDto accountDto = accountService.findById(id);
        return ResponseEntity.ok(accountDto);
    }
}
