package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.entity.BillEntity;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.BillDetailsRepository;
import com.hunre.it.webstudyonline.repository.BillRepository;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class StatisticsService {
    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillDetailsRepository billDetailsRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CourseRepository courseRepository;

    public BigDecimal[] getMonthlyRevenue(int year) {
        LocalDateTime startOfYear = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime endOfYear = LocalDateTime.of(year, 12, 31, 23, 59, 59, 999999999);

        List<BillEntity> bills = billRepository.findAllByCreatedDateBetween(startOfYear, endOfYear);

        BigDecimal[] revenues = new BigDecimal[12];
        Arrays.fill(revenues, BigDecimal.ZERO);

        for (BillEntity bill : bills) {
            BigDecimal revenue = billDetailsRepository.getTotalPriceByBillId(bill.getId());

            revenues[bill.getCreatedDate().getMonthValue() - 1] = revenues[bill.getCreatedDate().getMonthValue() - 1].add(revenue);
        }

        return revenues;
    }

    public Map<String, Long> getEntitiesCount() {
        return Map.of("account", accountRepository.count(), "course", courseRepository.count());
    }
}
