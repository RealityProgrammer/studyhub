package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class StatisticsController {
    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("monthly-revenue")
    public ResponseEntity<BigDecimal[]> getMonthlyRevenue(@RequestParam int year) {
        return ResponseEntity.ok(statisticsService.getMonthlyRevenue(year));
    }
}
