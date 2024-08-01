package com.example.demo.product.controller;

import com.example.demo.product.dto.CartDTO;
import com.example.demo.product.service.cart.CartService;
import com.example.demo.productAdmin.domain.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/cart")
@Log4j2
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public String register(CartDTO cartDTO, Principal principal) {
        cartDTO.setMid(principal.getName());
//        cartDTO.setMid("test");
        return cartService.register(cartDTO);
    }

    @GetMapping
    public ResponseEntity<Object> list(Principal principal) {
        List<CartDTO> cartList = cartService.getCartListByMid(principal.getName());
//        List<CartDTO> cartList = cartService.getCartListByMid("test");
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Object> update(CartDTO cartDTO) {
        cartService.modify(cartDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Object> delete(@PathVariable("cartId") Long cartId) {
        cartService.remove(cartId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
