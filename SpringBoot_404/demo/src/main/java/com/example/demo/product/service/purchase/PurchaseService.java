package com.example.demo.product.service.purchase;

import com.example.demo.product.domain.Purchase;
import com.example.demo.product.dto.PurchaseDTO;

import java.util.List;

public interface PurchaseService {
    List<PurchaseDTO> readAll(String mid);
    Purchase getPurchase(Long id);
    void register(PurchaseDTO purchaseDTO);
    void modify(PurchaseDTO purchaseDTO);
    void modifyStatus(PurchaseDTO purchaseDTO);
    void remove(Long id);
}
