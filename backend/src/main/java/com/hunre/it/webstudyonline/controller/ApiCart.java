package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.dto.CartDto;
import com.hunre.it.webstudyonline.model.request.AddCartForm;
import com.hunre.it.webstudyonline.model.request.UpdateCartForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.service.impl.ICartServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ApiCart {
    @Autowired
    private ICartServiceImpl cartService;

    @GetMapping("/list")
    public ResponseEntity<BaseResponse<List<CartDto>>> getCart() {
        BaseResponse<List<CartDto>> response = cartService.getAllCart();
        return ResponseEntity.ok(response);
    }
    @PostMapping("/add")
    public ResponseEntity<BaseResponse<List<CartDto>>> addCart( @RequestBody List<AddCartForm> addCartForms) {
        BaseResponse<List<CartDto>> response = cartService.addCart(addCartForms);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<CartDto>> update(@PathVariable String id,@RequestBody UpdateCartForm updateCartForm) {
        BaseResponse<CartDto> response = cartService.updateQuantity(id, updateCartForm);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<BaseResponse<String>> delete(@RequestBody List<String> ids) {
        BaseResponse<String> response = cartService.deleteCart(ids);
        return ResponseEntity.ok(response);
    }
}
