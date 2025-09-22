package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.RoleEntity;
import com.hunre.it.webstudyonline.model.dto.RoleDto;
import com.hunre.it.webstudyonline.model.dto.auth.RegisterUserDto;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class AuthMapper {
    public RegisterUserDto convertToDTO(AccountEntity account) {
        RegisterUserDto accountDTO = new RegisterUserDto();
        accountDTO.setId(account.getId());
        accountDTO.setCode(account.getCode());
        accountDTO.setFullname(account.getFullname());
        accountDTO.setPhone(account.getPhone());
        accountDTO.setEmail(account.getEmail());
        accountDTO.setEnabled(account.isEnabled());
        accountDTO.setPassword(account.getPassword());
        Set<RoleDto> roleDTOs = account.getRoles().stream()
                .map(role -> {
                    RoleDto roleDTO = new RoleDto();
                    roleDTO.setId(role.getId());
                    roleDTO.setCode(role.getCode());
                    roleDTO.setName(role.getName());
                    return roleDTO;
                })
                .collect(Collectors.toSet());
        accountDTO.setRoles(roleDTOs);
        Set<Long> roleIds = account.getRoles().stream()
                .map(RoleEntity::getId)
                .collect(Collectors.toSet());
        accountDTO.setRoleIds(roleIds);
        return accountDTO;
    }
}
