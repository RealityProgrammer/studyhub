package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.CartDto;
import com.hunre.it.webstudyonline.model.request.AddCartForm;
import com.hunre.it.webstudyonline.model.request.UpdateCartForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;

import java.util.List;
import java.util.Map;

public interface ICartService {
    BaseResponse<List<CartDto>> addCart(List<AddCartForm> addCartForms);
    BaseResponse<CartDto> updateQuantity(String id, UpdateCartForm updateCartForm);
    BaseResponse<String> deleteCart(List<String> cartIds);
    BaseResponse<List<CartDto>> getAllCart();
}
