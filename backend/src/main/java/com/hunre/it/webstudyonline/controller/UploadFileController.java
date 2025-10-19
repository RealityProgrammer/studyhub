package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.ImageDto;
import com.hunre.it.webstudyonline.service.UploadImageFile;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequiredArgsConstructor
public class UploadFileController {
    @Autowired
    private UploadImageFile uploadImageFile;

    @PostMapping("/image")
    public ImageDto uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        return uploadImageFile.uploadImage(file);
    }
}
