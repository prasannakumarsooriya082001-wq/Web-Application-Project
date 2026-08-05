package com.luxecraft.luxecraft.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.luxecraft.luxecraft.Model.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel,Long>
{
     List<ProductModel> findAllByOrderByProductIdAsc();
    
}
