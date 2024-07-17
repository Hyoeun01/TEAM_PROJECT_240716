package com.example.demo.product.repository.productSearch;

import com.example.demo.product.domain.Product;
import com.example.demo.product.domain.QProduct;
import com.example.demo.product.dto.ProductDTO;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class ProductSearchImpl extends QuerydslRepositorySupport implements ProductSearch {
    public ProductSearchImpl() {
        super(Product.class);
    }
    @Override
    public Page<ProductDTO> searchWithAll(String[] types, String keyword, Pageable pageable) {
        QProduct product = QProduct.product;
        JPQLQuery<Product> productJPQLQuery = from(product);

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
            productJPQLQuery.where(booleanBuilder);
        }
        productJPQLQuery.groupBy(product);

        getQuerydsl().applyPagination(pageable, productJPQLQuery);
        JPQLQuery<Tuple> tupleJPQLQuery = productJPQLQuery.select(product.category, product.product_name);
        List<Tuple> tupleList = tupleJPQLQuery.fetch();


        return null;
    }
}
