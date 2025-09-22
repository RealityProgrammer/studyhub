package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.ImageDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploadImageFile {
    ImageDto uploadImage(MultipartFile file) throws IOException;
    void deleteImage(String publicId);
}
