package com.example.demo.product.service.cart;

import com.example.demo.product.domain.Cart;
import com.example.demo.product.dto.CartDTO;
import com.example.demo.product.repository.CartRepository;
import com.example.demo.product.repository.ProductRepository;
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
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    public String  register(CartDTO cartDTO) {
        Long cartCount = cartRepository.countByUserId(cartDTO.getUser_id());
        if(cartCount > 10) {
            return "error";
        }
        Cart cart = modelMapper.map(cartDTO, Cart.class);
        return cartRepository.save(cart).getCart_id().toString();
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
