package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.CartEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.entity.ImagesEntity;
import com.hunre.it.webstudyonline.model.dto.CartDto;
import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.dto.ItemDto;
import com.hunre.it.webstudyonline.model.request.AddCartForm;
import com.hunre.it.webstudyonline.model.request.UpdateCartForm;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import com.hunre.it.webstudyonline.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CartMapper {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseMapper courseMapper;
    @Autowired
    private ImageRepository imageRepository;

    public CartDto toDto(CartEntity cartEntity) {
        CartDto cartDto = new CartDto();
        cartDto.setId(cartEntity.getId());
        cartDto.setQuantity(cartEntity.getQuantity());

        ItemDto itemDto = null;
        CourseEntity course = cartEntity.getCourse();

        if (course != null) {
            CourseDto courseDto = courseMapper.toDto(course);
            List<ImagesEntity> images = imageRepository.findByCourseId(course.getId());
            if (!images.isEmpty()) {
                courseDto.setImageUrl(images.get(0).getUrl());
            }
            itemDto = new ItemDto(
                    course.getId(),
                    course.getName(),
                    course.getDescription(),
                    course.getPrice(),
                    course.getDiscount(),
                    courseDto.getImageUrl(),
                    course.getCode()
            );
        }
        cartDto.setItem(itemDto);
        return cartDto;
    }

    public CartEntity toEntity(String email, AddCartForm addCartForm) {
        CartEntity cartEntity = new CartEntity();
        cartEntity.setQuantity(addCartForm.getQuantity());

        AccountEntity accountEntity = accountRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        cartEntity.setAccount(accountEntity);

        CourseEntity courseEntity = courseRepository.findById(addCartForm.getItemId()).orElseThrow(() -> new RuntimeException("Course not found"));
        cartEntity.setCourse(courseEntity);
        return cartEntity;
    }

    public CartEntity toEntity(CartEntity cartEntity, UpdateCartForm updateCartForm) {
        cartEntity.setQuantity(updateCartForm.getQuantity());
        return cartEntity;
    }
}

