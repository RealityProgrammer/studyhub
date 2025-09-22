package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.BillDetailsEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.model.dto.BillDetailsDto;
import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.dto.ItemDto;
import com.hunre.it.webstudyonline.repository.BillRepository;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class BillDetailsMapper {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private BillRepository billRepository;
    @Autowired
    private CourseMapper courseMapper;
    public BillDetailsDto toDto(BillDetailsEntity entity) {
        BillDetailsDto dto = new BillDetailsDto();
        dto.setId(entity.getId());
        dto.setQuantity(entity.getQuantity());
        dto.setBillId(entity.getBillEntity() != null ? entity.getBillEntity().getId() : null);

        ItemDto itemDto = null;
        CourseEntity course = entity.getCourseEntity() != null ? entity.getCourseEntity() : null;
        CourseDto courseDto = courseMapper.toDto(course);

        itemDto = new ItemDto(
                entity.getCourseEntity().getId(),
                entity.getCourseEntity().getName(),
                entity.getCourseEntity().getDescription(),
                entity.getCourseEntity().getPrice(),
                entity.getCourseEntity().getDiscount(),
                courseDto.getImageUrl(),
                entity.getCourseEntity().getCode()
                );
        dto.setPrice(entity.getPrice());
        dto.setItem(itemDto);
        return dto;
    }

    public BillDetailsEntity toEntity(BillDetailsDto dto) {
        BillDetailsEntity entity = new BillDetailsEntity();
        entity.setId(dto.getId());
        entity.setQuantity(dto.getQuantity());

        if (dto.getBillId() != null) {
            billRepository.findById(dto.getBillId()).ifPresent(entity::setBillEntity);
        }

        if (dto.getItem() != null) {
            ItemDto item = dto.getItem();
                Optional<CourseEntity> courseEntity = courseRepository.findById(item.getId());
                courseEntity.ifPresent(entity::setCourseEntity);
        }
        entity.setPrice(dto.getPrice());
        return entity;
    }
}
