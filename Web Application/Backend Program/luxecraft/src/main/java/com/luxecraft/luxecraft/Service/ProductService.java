package com.luxecraft.luxecraft.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luxecraft.luxecraft.Model.ProductModel;
import com.luxecraft.luxecraft.Repository.ProductRepository;

@Service
public class ProductService
{
     @Autowired
    private ProductRepository pr;


    public ProductModel addProduct(ProductModel product) {

        return pr.save(product);

    }


    public List<ProductModel> getAllProducts() {

        return pr.findAllByOrderByProductIdAsc();

    }


    public ProductModel getProductById(Long productId) {

        return pr.findById(productId).orElse(null);

    }


    public ProductModel updateProduct(ProductModel product) {

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
