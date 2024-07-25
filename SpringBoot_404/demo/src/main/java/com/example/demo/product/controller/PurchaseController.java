package com.example.demo.product.controller;


import com.example.demo.product.dto.PurchaseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/purchase")
@Log4j2
@RequiredArgsConstructor
public class PurchaseController {
    @GetMapping("/list")
    public void list(PurchaseDTO purchaseDTO, Model model) {

    }
}
