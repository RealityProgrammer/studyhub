package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.PointDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IPointService {
    ResponsePage<List<PointDto>> getAllPoints(Long examId,Pageable pageable);
    BaseResponse<PointDto> addPoint(PointDto pointDto);
    BaseResponse<PointDto> updatePoint(String id,PointDto pointDto);
    BaseResponse<PointDto> deletePoint(String id);
    BaseResponse<PointDto> getPoint(String id);

    ResponsePage<List<PointDto>> findByUser(Pageable pageable);
}
