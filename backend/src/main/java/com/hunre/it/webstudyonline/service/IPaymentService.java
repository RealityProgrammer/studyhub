package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.response.VNPayResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public interface IPaymentService {
     // Vnpay
     VNPayResponse createVnPayPayment(HttpServletRequest request);

     //momo
     String createPaymentRequest(String amount);
     String checkPaymentStatus(String orderId);

     // zalopay
     String createOrder(Map<String, Object> orderRequest);
     String getOrderStatus(String appTransId);
}