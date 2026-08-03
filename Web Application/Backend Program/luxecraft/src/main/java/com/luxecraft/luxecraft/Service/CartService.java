package com.luxecraft.luxecraft.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luxecraft.luxecraft.Model.CartModel;
import com.luxecraft.luxecraft.Repository.CartRepository;

@Service
public class CartService 
{
     @Autowired
    private CartRepository cartRepository;


    // ================= ADD TO CART =================

    public CartModel addToCart(Long customerId,Long productId,int quantity) {

        CartModel existingCart =cartRepository
                        .findByCustomerId(customerId)
                        .stream()
                        .filter(cart -> cart.getProductId().equals(productId))
                        .findFirst()
                        .orElse(null);


        // Product already in cart
        if (existingCart != null) {

            existingCart.setQuantity(existingCart.getQuantity() + quantity);

            return cartRepository.save(existingCart);
        }


        // New cart item
        CartModel cart = new CartModel();

        cart.setCustomerId(customerId);
        cart.setProductId(productId);
        cart.setQuantity(quantity);

        return cartRepository.save(cart);
    }


    // ================= GET CUSTOMER CART =================

    public List<CartModel> getCart(Long customerId) {

        return cartRepository.findByCustomerId(customerId);
    }


    // ================= REMOVE FROM CART =================

    public void removeFromCart(Long customerId,Long cartId) {

        CartModel cart =cartRepository.findById(cartId)
                        .orElseThrow(() ->new RuntimeException("Cart item not found"));

        if (!cart.getCustomerId().equals(customerId)) {

            throw new RuntimeException("Unauthorized cart access");
        }

        cartRepository.delete(cart);
    }
    
}
