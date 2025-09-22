package com.hunre.it.webstudyonline.utils;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import jakarta.validation.ValidationException;
import org.apache.commons.lang3.StringUtils;

public class DateUtils {

    public static final String YYYYMMDD = "yyyy-MM-dd";
    public static final String DDMMYYYY = "dd/MM/yyyy";

    public static LocalDate strToDate(String date) {
        if (StringUtils.isEmpty(date)) {
            throw new ValidationException("Ngày không được để trống");
        }

        try {
            if (date.contains("-")) {
                return LocalDate.parse(date, DateTimeFormatter.ofPattern(YYYYMMDD));
            }
            if (date.contains("/")) {
                return LocalDate.parse(date, DateTimeFormatter.ofPattern(DDMMYYYY));
            }
        } catch (DateTimeParseException e) {
            throw new ValidationException("Định dạng ngày không hợp lệ: " + date);
        }

        throw new ValidationException("Không xác định được định dạng ngày: " + date);
    }
}
