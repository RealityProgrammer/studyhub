package com.hunre.it.webstudyonline.utils;

import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;

public class LongUtils {
    public static Utils<Long> strToLong(String value) {
        if (StringUtils.isEmpty(value)) {
            return new Utils<>(HttpStatus.BAD_REQUEST.value(),Constant.HTTP_MESSAGE.StringToLong,null);
        }
        try {
            Long longValue = Long.valueOf(value);
            return new Utils<>(0,"",longValue);
        }catch (NumberFormatException e){
            return new Utils<>(HttpStatus.BAD_REQUEST.value(),Constant.HTTP_MESSAGE.EMPTY,null);
        }
    }
}
