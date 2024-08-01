package com.example.demo.product.controller;


import com.example.demo.product.domain.Purchase;
import com.example.demo.product.dto.PurchaseDTO;
import com.example.demo.product.service.purchase.PurchaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/purchase")
@Log4j2
@RequiredArgsConstructor
public class PurchaseController {
    private final PurchaseService purchaseService;

    @GetMapping("/list")
    public ResponseEntity<Object> list(Principal principal) {
        List<PurchaseDTO> purchaseDTOList = purchaseService.readAll(principal.getName());
        return new ResponseEntity<>(purchaseDTOList, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> getPurchase(@PathVariable Long id) {
        Purchase purchase = purchaseService.getPurchase(id);
        return new ResponseEntity<>(purchase, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Object> register(PurchaseDTO purchaseDTO, Principal principal) {

        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping
    public ResponseEntity<Object> modify(PurchaseDTO purchaseDTO) {
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> remove(@PathVariable Long id) {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
