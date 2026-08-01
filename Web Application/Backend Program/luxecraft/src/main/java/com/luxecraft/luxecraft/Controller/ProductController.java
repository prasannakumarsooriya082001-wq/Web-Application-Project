package com.luxecraft.luxecraft.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import com.luxecraft.luxecraft.Model.ProductModel;
import com.luxecraft.luxecraft.Service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private ProductService ps;

    @PostMapping("/add")
    public String addProduct(
            @RequestParam("productName") String productName,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("stockQuantity") Integer stockQuantity,
            @RequestParam("status") String status,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("image") MultipartFile image) throws IOException {

        ps.addProduct(
                productName,
                description,
                price,
                stockQuantity,
                status,
                categoryId,
                image);

        return "Product Added Successfully";
    }

    @GetMapping("/getAll")
    public List<ProductModel> getAllProducts() {

        return ps.getAllProducts();

    }

    @GetMapping("/get/{productId}")
    public ProductModel getProductById(@PathVariable Long productId) {

        return ps.getProductById(productId);

    }

    @PutMapping("/update")
    public ProductModel updateProduct(
            @RequestParam("productId") Long productId,
            @RequestParam("productName") String productName,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("stockQuantity") Integer stockQuantity,
            @RequestParam("status") String status,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        return ps.updateProduct(
                productId,
                productName,
                description,
                price,
                stockQuantity,
                status,
                categoryId,
                image);
    }

    @DeleteMapping("/delete/{productId}")
    public String deleteProduct(@PathVariable Long productId) {

        return ps.deleteProduct(productId);

    }

}
