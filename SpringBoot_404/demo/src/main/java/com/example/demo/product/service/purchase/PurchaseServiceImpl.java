package com.example.demo.product.service.purchase;

import com.example.demo.product.dto.PurchaseDTO;
import com.example.demo.product.repository.PurchaseRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class PurchaseServiceImpl implements PurchaseService {
    private final PurchaseRepository purchaseRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<PurchaseDTO> readAll() {
        return purchaseRepository.findAll().stream()
                .map(purchase -> modelMapper.map(purchase, PurchaseDTO.class))
                .collect(Collectors.toList());
    }

}
