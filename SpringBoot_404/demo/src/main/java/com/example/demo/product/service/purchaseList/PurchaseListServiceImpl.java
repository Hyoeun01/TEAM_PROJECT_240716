package com.example.demo.product.service.purchaseList;

import com.example.demo.product.domain.PurchaseList;
import com.example.demo.product.dto.PurchaseListDTO;
import com.example.demo.product.repository.PurchaseListRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class PurchaseListServiceImpl implements PurchaseListService{

    private final PurchaseListRepository purchaseListRepository;
    private final ModelMapper modelMapper;

    @Override
    public Long register(PurchaseListDTO purchaseListDTO) {
        PurchaseList purchaseList = modelMapper.map(purchaseListDTO, PurchaseList.class);
        return purchaseListRepository.save(purchaseList).getPurchase_list_id();
    }

    @Override
    public List<PurchaseListDTO> getAll() {
        return purchaseListRepository.findAll().stream()
                .map(purchaseList -> modelMapper.map(purchaseList, PurchaseListDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public PurchaseListDTO getOne(Long purchaseList_id) {
        Optional<PurchaseList> result = purchaseListRepository.findById(purchaseList_id);
        PurchaseList purchaseList = result.orElseThrow();
        return modelMapper.map(purchaseList, PurchaseListDTO.class);
    }

    @Override
    public void remove(Long purchaseList_id) {
        purchaseListRepository.deleteById(purchaseList_id);
    }
}
