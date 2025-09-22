package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.CategoryEntity;
import com.hunre.it.webstudyonline.model.dto.CategoryDto;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public CategoryDto toDto(CategoryEntity categoryEntity) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(categoryEntity.getId());
        categoryDto.setName(categoryEntity.getName());
        categoryDto.setCode(categoryEntity.getCode());
        return categoryDto;
    }
    public CategoryEntity toEntity(CategoryDto categoryDto) {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setId(categoryDto.getId());
        categoryEntity.setName(categoryDto.getName());
        categoryEntity.setCode(categoryDto.getCode());
        return categoryEntity;
    }
}
