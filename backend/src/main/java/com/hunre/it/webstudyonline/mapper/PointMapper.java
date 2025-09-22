package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.ExamEntity;
import com.hunre.it.webstudyonline.entity.PointEntity;
import com.hunre.it.webstudyonline.model.dto.PointDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PointMapper {
    @Autowired
    private ExamMapper examMapper;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private ExamRepository examRepository;

    public PointDto toDto(PointEntity pointEntity) {
        PointDto pointDto = new PointDto();
        pointDto.setId(pointEntity.getId());
        pointDto.setScore(pointEntity.getScore());
        pointDto.setCompletionTime(pointEntity.getCompletionTime());
        if (pointEntity.getAccountEntity() != null) {
            pointDto.setAccountId(pointEntity.getAccountEntity().getId());
        }
        if (pointEntity.getExamEntity() != null) {
            pointDto.setExamId(pointEntity.getExamEntity().getId());
            pointDto.setExamDto(examMapper.toDto(pointEntity.getExamEntity()));
        }
        pointDto.setAccountName(pointEntity.getAccountEntity().getFullname());
        return pointDto;
    }
    public PointEntity toEntity(String email,PointDto pointDto) {
        PointEntity pointEntity = new PointEntity();
        pointEntity.setId(pointDto.getId());
        pointEntity.setScore(pointDto.getScore());
        pointEntity.setCompletionTime(pointDto.getCompletionTime());
        AccountEntity account = accountRepository.findByEmail(email).orElse(null);
        pointEntity.setAccountEntity(account);
        Optional<ExamEntity> checkExamId = examRepository.findById(pointDto.getExamId());
        if (checkExamId.isEmpty()) {
            throw new RuntimeException("Exam not found");
        }
        pointEntity.setExamEntity(checkExamId.get());
        return pointEntity;
    }
}
