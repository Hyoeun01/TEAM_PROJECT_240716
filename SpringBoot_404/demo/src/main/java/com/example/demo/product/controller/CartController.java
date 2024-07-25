package com.example.demo.product.controller;

import com.example.demo.product.dto.CartDTO;
import com.example.demo.product.service.cart.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
@RequestMapping("/cart")
@Log4j2
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/register")
    public String register(@RequestBody CartDTO cartDTO, Principal principal) {

        cartDTO.setUser_id(principal.getName());
        return cartService.register(cartDTO);
    }

    @GetMapping("/list")
    public void list(CartDTO cartDTO, Model model) {

    }

}
