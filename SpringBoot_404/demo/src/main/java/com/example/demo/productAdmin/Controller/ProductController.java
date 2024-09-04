package com.example.demo.productAdmin.Controller;

import com.example.demo.productAdmin.domain.Product;
import com.example.demo.productAdmin.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

//@Controller
@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://43.203.244.127:3000") // 배포용으로 추가됨
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // 리스트 불러오기
    @GetMapping
    public ResponseEntity<Object> getProducts() {
        List<Product> list = productService.findAllProducts();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 클릭한 제품 불러오기
    @GetMapping("/{id}")
    public ResponseEntity<Object> getProductById(@PathVariable Long id) {
        Product product = productService.findProductById(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 작성하기
    @PostMapping
    public ResponseEntity<Object> addProduct(Product product, MultipartFile file, @RequestHeader("Authorization") String token) {

        try {
            String uuid = UUID.randomUUID().toString();
            String fileName = uuid + file.getOriginalFilename();
                // 파일 저장 경로 설정
                String uploadPath = "C:\\upload\\" + fileName;
                Path destinationFile = Paths.get(uploadPath);
                // 파일 저장
                file.transferTo(destinationFile);
                product.setUuid(uuid);
                product.setProduct_img(fileName);
            }catch(Exception e){
                e.printStackTrace();
                return new ResponseEntity<>("파일이 비어있습니다.", HttpStatus.BAD_REQUEST);
            }
        return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.CREATED);
    }

    // 삭제하기
    @DeleteMapping("{productId}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 수정하기
    @PutMapping("/{id}")
    public ResponseEntity<Object> editProduct(@PathVariable("id") Long productId ,Product product, MultipartFile file) {
        product.setProduct_img(file.getOriginalFilename());
        try {
            String uuid = UUID.randomUUID().toString();
            String fileName = uuid + file.getOriginalFilename();
            // 파일 저장 경로 설정
            String uploadPath = "C:\\upload\\" + fileName;
            Path destinationFile = Paths.get(uploadPath);
            // 파일 저장
            file.transferTo(destinationFile);
            product.setUuid(uuid);
            product.setProduct_img(fileName);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("파일이 비어있습니다.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.CREATED);
    }
}
