package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.ImagesEntity;
import com.hunre.it.webstudyonline.model.dto.ImageDto;
import org.springframework.stereotype.Component;

@Component
public class ImageMapper {
    public ImageDto toDTO(ImagesEntity image) {
        ImageDto imageDTO = new ImageDto();
        imageDTO.setId(image.getId());
        imageDTO.setUrl(image.getUrl());
        imageDTO.setType(image.getType());
        imageDTO.setPublicId(image.getPublicId());
        return imageDTO;
    }

    public ImagesEntity toEntity(ImageDto imageDTO) {
        ImagesEntity image = new ImagesEntity();
        image.setId(imageDTO.getId());
        image.setUrl(imageDTO.getUrl());
        image.setType(imageDTO.getType());
        image.setPublicId(imageDTO.getPublicId());
        return image;
    }
}
