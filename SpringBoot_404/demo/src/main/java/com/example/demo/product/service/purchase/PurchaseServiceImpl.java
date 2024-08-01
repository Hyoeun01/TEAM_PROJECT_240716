package com.example.demo.product.service.purchase;

import com.example.demo.product.domain.Cart;
import com.example.demo.product.domain.Purchase;
import com.example.demo.product.domain.PurchaseDetail;
import com.example.demo.product.dto.PurchaseDTO;
import com.example.demo.product.repository.CartRepository;
import com.example.demo.product.repository.PurchaseDetailRepository;
import com.example.demo.product.repository.PurchaseRepository;
import com.example.demo.productAdmin.domain.Product;
import com.example.demo.productAdmin.repository.ProductRepository;
import com.example.demo.pse.domain.Member;
import com.example.demo.pse.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class PurchaseServiceImpl implements PurchaseService {
    private final PurchaseRepository purchaseRepository;
    private final MemberRepository memberRepository;
    private final CartRepository cartRepository;
    private final PurchaseDetailRepository purchaseDetailRepository;

    @Override
    public List<PurchaseDTO> readAll(String mid) {
        List<Purchase> entityList = purchaseRepository.findByMid(mid);
        List<PurchaseDTO> dtoList =
        entityList.stream()
            .map(entity ->
                PurchaseDTO.builder()
                    .purchase_id(entity.getPurchase_id())
                    .name(entity.getName())
                    .phone(entity.getPhone())
                    .email(entity.getEmail())
                    .address(entity.getAddress())
                    .totalPrice(entity.getTotalPrice())
                    .message(entity.getMessage())
                    .purchase_status(entity.getPurchase_status())
                    .modDate(entity.getModDate())
                    .regDate(entity.getRegDate())
                    .build())
            .collect(Collectors.toList());
        return dtoList;
    }

    @Override
    public Purchase getPurchase(Long id) {
        Optional<Purchase> result = purchaseRepository.findById(id);
        Purchase purchase = result.orElseThrow();
        return purchase;
    }

    @Override
    public void register(PurchaseDTO purchaseDTO) {
        Member member = memberRepository.findByMid(purchaseDTO.getMid()).orElseThrow();
        List<Cart> cartList = Arrays.stream(purchaseDTO.getCartArray()).map(cartId ->
            cartRepository.findById(cartId).orElseThrow()).collect(Collectors.toList());
        Purchase purchase = Purchase.builder()
            .name(purchaseDTO.getName())
            .phone(purchaseDTO.getPhone())
            .email(purchaseDTO.getEmail())
            .address(purchaseDTO.getAddress())
            .totalPrice(purchaseDTO.getTotalPrice())
            .message(purchaseDTO.getMessage())
            .purchase_status(purchaseDTO.getPurchase_status())
            .build();
        Purchase saveData = purchaseRepository.save(purchase);
        List<PurchaseDetail> purchaseList = cartList.stream().map(
            cart ->
                PurchaseDetail.builder()
                    .purchase(saveData)
                    .product(cart.getProduct())
                    .quantity(cart.getQuantity())
                    .discount(0)
                .build()
        ).collect(Collectors.toList());
        purchaseDetailRepository.saveAll(purchaseList);
    }

    @Override
    public void modify(PurchaseDTO purchaseDTO) {
        Optional<Purchase> result = purchaseRepository.findById(purchaseDTO.getPurchase_id());
        Purchase purchase = result.orElseThrow();
        purchase.changePurchase(purchaseDTO);
        purchaseRepository.save(purchase);
    }

    @Override
    public void modifyStatus(PurchaseDTO purchaseDTO) {
        Optional<Purchase> result = purchaseRepository.findById(purchaseDTO.getPurchase_id());
        Purchase purchase = result.orElseThrow();
        purchase.changeStatus(purchaseDTO);
        purchaseRepository.save(purchase);
    }

    @Override
    public void remove(Long id) {
        purchaseRepository.deleteById(id);
    }
}
