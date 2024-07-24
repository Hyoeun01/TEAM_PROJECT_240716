package com.example.demo.product.Controller;

import com.example.demo.product.domain.Product;
import com.example.demo.product.dto.ProductDTO;
import com.example.demo.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

//@Controller
@RestController
@RequestMapping("/product")
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
    public ResponseEntity<Object> addProduct(Product product, MultipartFile file) {
        product.setProduct_img(file.getOriginalFilename());
        try {
                // 파일 저장 경로 설정
                String uploadPath = "C:\\upload\\" + file.getOriginalFilename();
                Path destinationFile = Paths.get(uploadPath);
                // 파일 저장
                file.transferTo(destinationFile);
            }catch(Exception e){
                e.printStackTrace();
                return new ResponseEntity<>("파일이 비어있습니다.", HttpStatus.BAD_REQUEST);
            }
        return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.CREATED);
//        MultipartFile file = productDTO.getFile();
//        if (file!=null && !file.isEmpty()) {
//            try {
//                // 파일 저장 경로 설정
//                String uploadPath = "C:\\upload\\" + file.getOriginalFilename();
//                Path destinationFile = Paths.get(uploadPath);
//                // 파일 저장
//                file.transferTo(destinationFile);
//                productDTO.setProduct_img(file.getOriginalFilename());
//                return new ResponseEntity<>(productService.saveProduct(productDTO), HttpStatus.CREATED);
//            }catch(Exception e){
//                e.printStackTrace();
//                return new ResponseEntity<>("파일이 비어있습니다.", HttpStatus.BAD_REQUEST);
//            }
//        }else{
//            return new ResponseEntity<>("파일이 비어있습니다.", HttpStatus.BAD_REQUEST);
//        }
    }

    // 파일 업로드
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // 파일이 비어있지 않은지 확인
            if (file.isEmpty()) {
                return new ResponseEntity<>("파일이 비어있습니다.", HttpStatus.BAD_REQUEST);
            }

            // 파일 저장 경로 설정
            String uploadPath = "C:\\upload\\" + file.getOriginalFilename();
            Path destinationFile = Paths.get(uploadPath);
            // 파일 저장
            file.transferTo(destinationFile);

            return new ResponseEntity<>("파일 업로드 성공", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("파일 업로드 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        }

    // 삭제하기
    @DeleteMapping("{productId}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public String getProduct(){
            return "product/list";
    }

}
