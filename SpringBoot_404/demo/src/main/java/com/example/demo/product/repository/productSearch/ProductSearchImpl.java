package com.example.demo.product.repository.productSearch;

import com.example.demo.product.domain.Product;
import com.example.demo.product.domain.QProduct;
import com.example.demo.product.dto.ProductDTO;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;
import java.util.stream.Collectors;

public class ProductSearchImpl extends QuerydslRepositorySupport implements ProductSearch {
    public ProductSearchImpl() {
        super(Product.class);
    }
    @Override
    public Page<ProductDTO> searchAll(String[] types, String keyword, Pageable pageable) {
        QProduct product = QProduct.product;
        JPQLQuery<Product> query = from(product);

        if((types != null && types.length > 0) && keyword != null){
            BooleanBuilder booleanBuilder = new BooleanBuilder();
            for(String type : types){
                switch(type){
                    case "c" :
                        booleanBuilder.or(product.category.contains(keyword));
                        break;
                    case "n" :
                        booleanBuilder.or(product.product_name.contains(keyword));
                        break;
                }
            }// end for
            query.where(booleanBuilder);
        }
        query.groupBy(product);

        getQuerydsl().applyPagination(pageable, query);

        JPQLQuery<Tuple> tupleQuery = query.select(product);
        List<Tuple> tupleList = tupleQuery.fetch();

        List<ProductDTO> dtoList = tupleList.stream().map(tuple -> {
            Product product1 = (Product) tuple.get(product);

            ProductDTO dto = ProductDTO.builder()
                    .product_id(product1.getProduct_id())
                    .product_name(product1.getProduct_name())
                    .price(product1.getPrice())
                    .quantity(product1.getTotal_quantity())
                    .category(product1.getCategory())
                    .content(product1.getContent())
                    .product_img(product1.getProduct_img())
                    .build();
            return dto;
        }).collect(Collectors.toList());

        long totalCount = query.fetchCount();

        return new PageImpl<>(dtoList, pageable, totalCount);
    }
}
