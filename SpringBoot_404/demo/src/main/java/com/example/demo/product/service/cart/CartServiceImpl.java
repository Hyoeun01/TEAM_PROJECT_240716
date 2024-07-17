package com.example.demo.product.service.cart;

import com.example.demo.product.domain.Cart;
import com.example.demo.product.dto.CartDTO;
import com.example.demo.product.repository.CartRepository;
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
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;
    private final ModelMapper modelMapper;
    
    @Override
    public Long register(CartDTO cartDTO) {
        return 0L;
    }

    @Override
    public List<CartDTO> selectAll() {
        return cartRepository.findAll().stream()
                .map(cart -> modelMapper.map(cart, CartDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void modify(CartDTO cartDTO) {
        Optional<Cart> result = cartRepository.findById(cartDTO.getCart_id());
        Cart cart = result.orElseThrow();
        cart.changeQuantity(cartDTO.getQuantity());
        cartRepository.save(cart);
    }

    @Override
    public void remove(Long cart_id) {
        cartRepository.deleteById(cart_id);
    }
}
