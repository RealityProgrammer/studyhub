package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.RoleEntity;
import com.hunre.it.webstudyonline.model.dto.RoleDto;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {
    public RoleDto toDto(RoleEntity roleEntity) {
        RoleDto dto = new RoleDto();
        dto.setId(roleEntity.getId());
        dto.setCode(roleEntity.getCode());
        dto.setName(roleEntity.getName());
        return dto;
    }
    public RoleEntity toRoleEntity(RoleDto dto) {
        RoleEntity entity = new RoleEntity();
        entity.setId(dto.getId());
        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        return entity;
    }
}