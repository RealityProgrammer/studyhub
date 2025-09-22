package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.InforTeacherEntity;
import com.hunre.it.webstudyonline.model.dto.InforTeacherDto;
import com.hunre.it.webstudyonline.model.request.AddInforTeacherForm;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.InforTeacherRepository;
import com.hunre.it.webstudyonline.utils.LongUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class InforTeacherMapper {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountMapper accountMapper;

    public InforTeacherEntity toInforTeacherEntity(AddInforTeacherForm addInforTeacherForm) {
        AccountEntity  accountEntity = accountRepository.findById(addInforTeacherForm.getAccountId()).orElseThrow(() -> new RuntimeException("Account not found"));
        InforTeacherEntity inforTeacherEntity = new InforTeacherEntity();
        inforTeacherEntity.setAccount(accountEntity);
        inforTeacherEntity.setAddress(addInforTeacherForm.getAddress());
        inforTeacherEntity.setBirthday(addInforTeacherForm.getBirthday());
        inforTeacherEntity.setExperience(addInforTeacherForm.getExperience());
        return inforTeacherEntity;
    }

    public InforTeacherDto toInforTeacherDto(InforTeacherEntity inforTeacherEntity) {
        InforTeacherDto inforTeacherDto = new InforTeacherDto();
        inforTeacherDto.setId(inforTeacherEntity.getId());
        inforTeacherDto.setAddress(inforTeacherEntity.getAddress());
        inforTeacherDto.setBirthday(inforTeacherEntity.getBirthday().toString());
        inforTeacherDto.setExperience(inforTeacherEntity.getExperience());
        inforTeacherDto.setAccountDto(accountMapper.toDto(inforTeacherEntity.getAccount()));

        return inforTeacherDto;
    }
}
