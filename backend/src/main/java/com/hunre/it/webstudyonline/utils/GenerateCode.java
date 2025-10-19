package com.hunre.it.webstudyonline.utils;

import java.time.ZonedDateTime;

public class GenerateCode {
    public static String generateUniqueCode(String code) {
        code = code.toUpperCase();
        ZonedDateTime now = ZonedDateTime.now();
        int year = now.getYear() % 100; // Lấy 2 số cuối của năm
        int uniqueNumber = (int) (Math.random() * 90000) + 10000; // Số ngẫu nhiên 5 chữ số
        return String.format(code+"%d%d", year, uniqueNumber);
    }

}
