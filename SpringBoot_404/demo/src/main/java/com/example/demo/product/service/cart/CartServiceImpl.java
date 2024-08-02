package com.example.demo.product.service.cart;

import com.example.demo.product.domain.Cart;
import com.example.demo.product.dto.CartDTO;
import com.example.demo.product.repository.CartRepository;

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
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;

    private final ModelMapper modelMapper;

    @Override
    public String  register(CartDTO cartDTO) {
        Optional<Member> mResult = memberRepository.findByMid(cartDTO.getMid());
        Member member = mResult.orElseThrow();
        Optional<Product> pResult = productRepository.findById(cartDTO.getProduct_id());
        Product product = pResult.orElseThrow();
        Long cartCount = cartRepository.countByUserId(member);
        if(cartCount > 10) {
            return "error : 카트에 등록된 제품이 10개 이상입니다.";
        }
        Optional<Cart> cResult = cartRepository.findByMidAndProduct_id(cartDTO.getMid(),cartDTO.getProduct_id());
        Cart cart = new Cart();
        if(cResult.isPresent()) {
            cart = cResult.orElseThrow();
            cart.changeCart(cartDTO);
        }else{
            cart = Cart.builder()
                .cart_id(cartDTO.getCart_id())
                .member(member)
                .product(product)
                .quantity(cartDTO.getQuantity())
                .purchaseCheck(true)
                .build();
        }
        return cartRepository.save(cart).getCart_id().toString();
    }

    @Override
    public List<CartDTO> getCartListByMid(String mid) {
        List<Cart> cartList = cartRepository.findByMid(mid);
        List<CartDTO> cartDTOList = cartList.stream().map(cart -> (
            CartDTO.builder()
                .cart_id(cart.getCart_id())
                .product_id(cart.getProduct().getProduct_id())
                .product_name(cart.getProduct().getProduct_name())
                .product_img(cart.getProduct().getProduct_img())
                .price(cart.getProduct().getPrice())
                .mid(cart.getMember().getMid())
                .quantity(cart.getQuantity())
                .purchaseCheck(cart.isPurchaseCheck())
                .build()
            )
        ).toList();
        return cartDTOList;
    }

    @Override
    public void modify(CartDTO cartDTO) {
        Optional<Cart> result = cartRepository.findById(cartDTO.getCart_id());
        Cart cart = result.orElseThrow();
        cart.changeCart(cartDTO);
        cartRepository.save(cart);
    }

    @Override
    public void remove(Long cart_id) {
        cartRepository.deleteById(cart_id);
    }

    @Override
    public void changeCheck(Long cart_id) {
        Optional<Cart> result = cartRepository.findById(cart_id);
        Cart cart = result.orElseThrow();
        cart.changePcheck();
        cartRepository.save(cart);
    }
}

