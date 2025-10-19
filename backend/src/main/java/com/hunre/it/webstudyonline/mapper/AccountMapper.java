package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.ImagesEntity;
import com.hunre.it.webstudyonline.entity.RoleEntity;
import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;
@Component
public class AccountMapper {
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private RoleMapper roleMapper;

    public AccountDto toDto(AccountEntity userEntity) {
        AccountDto dto = new AccountDto();
        dto.setId(userEntity.getId());
        dto.setCode(userEntity.getCode());
        dto.setFullName(userEntity.getFullname());
        dto.setPhone(userEntity.getPhone());
        dto.setEmail(userEntity.getEmail());
        dto.setEnabled(userEntity.isEnabled());
        dto.setRoles(userEntity.getRoles()
                .stream()
                .map(roleMapper::toDto)
                .collect(Collectors.toSet()));
        ImagesEntity images = imageRepository.findByAccountId(dto.getId());
        if (images != null) {
            dto.setImageUrl(images.getUrl());
        }
        Set<Long> roleId = userEntity.getRoles().stream().map(RoleEntity::getId).collect(Collectors.toSet());
        dto.setRoleIds(roleId);
        return dto;
    }

}