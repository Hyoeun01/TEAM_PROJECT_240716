package com.example.demo.product.controller;

import com.example.demo.product.dto.PurchaseListDTO;
import com.example.demo.product.service.purchaseList.PurchaseListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/purchaseList")
@Log4j2
@RequiredArgsConstructor
public class PurchaseListController {
    private final PurchaseListService purchaseListService;

    @GetMapping("/all")
    public void listAll(PurchaseListDTO purchaseListDTO, Model model){
    }

    @GetMapping("/read")
    public void read(Long purchase_list_id) {
        PurchaseListDTO purchaseListDTO = purchaseListService.getOne(purchase_list_id);
        log.info(purchaseListDTO);
    }

}
