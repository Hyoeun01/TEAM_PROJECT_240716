package com.example.demo.product.service.purchaseList;

import com.example.demo.product.domain.PurchaseDetail;
import com.example.demo.product.dto.PurchaseListDTO;
import com.example.demo.product.repository.PurchaseDetailRepository;
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

    private final PurchaseDetailRepository purchaseDetailRepository;
    private final ModelMapper modelMapper;

    @Override
    public Long register(PurchaseListDTO purchaseListDTO) {
        PurchaseDetail purchaseDetail = modelMapper.map(purchaseListDTO, PurchaseDetail.class);
        return purchaseDetailRepository.save(purchaseDetail).getPurchase_detail_id();
    }

    @Override
    public List<PurchaseListDTO> getAll() {
        return purchaseDetailRepository.findAll().stream()
                .map(purchaseDetail -> modelMapper.map(purchaseDetail, PurchaseListDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public PurchaseListDTO getOne(Long purchaseList_id) {
        Optional<PurchaseDetail> result = purchaseDetailRepository.findById(purchaseList_id);
        PurchaseDetail purchaseDetail = result.orElseThrow();
        return modelMapper.map(purchaseDetail, PurchaseListDTO.class);
    }

    @Override
    public void remove(Long purchaseList_id) {
        purchaseDetailRepository.deleteById(purchaseList_id);
    }
}
