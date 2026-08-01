package com.luxecraft.luxecraft.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.luxecraft.luxecraft.Model.CategoryModel;
import com.luxecraft.luxecraft.Model.ProductModel;
import com.luxecraft.luxecraft.Repository.CategoryRepository;
import com.luxecraft.luxecraft.Repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private ProductRepository pr;

    @Autowired
    private CategoryRepository cr;

    @Autowired
    private FileUploadService fus;

    public ProductModel addProduct(String productName,
            String description,
            Double price,
            Integer stockQuantity,
            String status,
            Long categoryId,
            MultipartFile image) throws IOException {

        ProductModel product = new ProductModel();

        product.setProductName(productName);

        product.setDescription(description);

        product.setPrice(price);

        product.setStockQuantity(stockQuantity);

        product.setStatus(status);

        String imageName = fus.uploadImage(image);

        product.setImageUrl(imageName);

        CategoryModel category = cr.findById(categoryId).orElseThrow();

        product.setCategory(category);

        return pr.save(product);

    }

    public List<ProductModel> getAllProducts() {

        return pr.findAllByOrderByProductIdAsc();

    }

    public ProductModel getProductById(Long productId) {

        return pr.findById(productId).orElse(null);

    }

    public ProductModel updateProduct(
            Long productId,
            String productName,
            String description,
            Double price,
            Integer stockQuantity,
            String status,
            Long categoryId,
            MultipartFile image) throws IOException {

        ProductModel product = pr.findById(productId).orElseThrow();

        product.setProductName(productName);
        product.setDescription(description);
        product.setPrice(price);
        product.setStockQuantity(stockQuantity);
        product.setStatus(status);

        CategoryModel category = cr.findById(categoryId).orElseThrow();
        product.setCategory(category);

        // New image selected
        if (image != null && !image.isEmpty()) {

            String imageName = fus.uploadImage(image);

            product.setImageUrl(imageName);
        }

        return pr.save(product);
    }

    public String deleteProduct(Long productId) {

        if (pr.existsById(productId)) {

            pr.deleteById(productId);

            return "Product Deleted Successfully";

        }

        return "Product Not Found";

    }

}
