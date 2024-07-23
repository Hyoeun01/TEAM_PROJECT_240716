package com.example.demo.product.service.purchaseList;

import com.example.demo.product.dto.PurchaseListDTO;

import java.util.List;

public interface PurchaseListService {
    List<PurchaseListDTO> getAll();
    PurchaseListDTO getOne(Long purchaseList_id);
    void remove(Long purchaseList_id);
}
