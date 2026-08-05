package com.luxecraft.luxecraft.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.luxecraft.luxecraft.Dto.AdminOrderDTO;
import com.luxecraft.luxecraft.Dto.OrderItemDTO;
import com.luxecraft.luxecraft.Dto.OrderRequestDTO;
import com.luxecraft.luxecraft.Dto.RecentOrderDTO;
import com.luxecraft.luxecraft.Model.CartModel;
import com.luxecraft.luxecraft.Model.OrderItemModel;
import com.luxecraft.luxecraft.Model.OrderModel;
import com.luxecraft.luxecraft.Model.ProductModel;
import com.luxecraft.luxecraft.Repository.CartRepository;
import com.luxecraft.luxecraft.Repository.OrderItemRepository;
import com.luxecraft.luxecraft.Repository.OrderRepository;
import com.luxecraft.luxecraft.Repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
        @Autowired
        private OrderRepository orderRepository;

        @Autowired
        private OrderItemRepository orderItemRepository;

        @Autowired
        private CartRepository cartRepository;

        @Autowired
        private ProductRepository productRepository;

        // ================= PLACE ORDER =================

        @Transactional
        public OrderModel placeOrder(Long customerId, OrderRequestDTO request) {

                // 1. Get customer's cart

                List<CartModel> cartItems = cartRepository.findByCustomerId(customerId);

                if (cartItems.isEmpty()) {

                        throw new RuntimeException(
                                        "Cart is empty");

                }

                // 2. Calculate subtotal

                double subtotal = 0;

                for (CartModel cart : cartItems) {

                        ProductModel product = productRepository
                                        .findById(cart.getProductId())
                                        .orElseThrow(() -> new RuntimeException(
                                                        "Product not found"));

                        subtotal += product.getPrice()
                                        * cart.getQuantity();

                }

                // 3. Calculate tax

                double tax = subtotal * 0.05;

                // 4. Calculate total

                double totalAmount = subtotal + tax;

                // 5. Create Order

                OrderModel order = new OrderModel();

                order.setCustomerId(customerId);

                order.setFirstName(request.getFirstName());
                order.setLastName(request.getLastName());
                order.setEmail(request.getEmail());
                order.setPhone(request.getPhone());

                order.setStreetAddress(request.getStreetAddress());
                order.setCity(request.getCity());
                order.setState(request.getState());
                order.setZipCode(request.getZipCode());
                order.setCountry(request.getCountry());

                order.setPaymentMethod(request.getPaymentMethod());

                order.setSubtotal(subtotal);
                order.setTax(tax);
                order.setTotalAmount(totalAmount);

                order.setStatus("PENDING");

                
                LocalDateTime orderDate = LocalDateTime.now();

                order.setOrderDate(orderDate);

                order.setDeliveryDate(
                        orderDate.plusDays(3));

                // Save Order

                OrderModel savedOrder = orderRepository.save(order);

                // 6. Create Order Items

                for (CartModel cart : cartItems) {

                        ProductModel product = productRepository
                                        .findById(cart.getProductId())
                                        .orElseThrow(() -> new RuntimeException(
                                                        "Product not found"));

                        OrderItemModel item = new OrderItemModel();

                        item.setOrderId(
                                        savedOrder.getOrderId());

                        item.setProductId(
                                        product.getProductId());

                        item.setQuantity(
                                        cart.getQuantity());

                        item.setPrice(
                                        product.getPrice());

                        orderItemRepository.save(item);

                }

                // 7. Clear Cart

                cartRepository.deleteAll(cartItems);

                // 8. Return Order

                return savedOrder;
        }

        public List<OrderModel> getCustomerOrders(Long customerId) {

                return orderRepository.findByCustomerId(customerId);

        }

        // ================= GET ORDER DETAILS =================

        public OrderModel getOrderDetails(
                        Long customerId,
                        Long orderId) {

                OrderModel order = orderRepository
                                .findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                if (!order.getCustomerId().equals(customerId)) {

                        throw new RuntimeException(
                                        "Unauthorized order access");
                }

                return order;
        }

        public List<OrderItemDTO> getOrderItems(Long customerId, Long orderId) {

                // Check order belongs to customer
                getOrderDetails(customerId, orderId);

                List<OrderItemModel> items = orderItemRepository.findByOrderId(orderId);

                return items.stream().map(item -> {

                        ProductModel product = productRepository.findById(item.getProductId())
                                        .orElseThrow(() -> new RuntimeException("Product not found"));

                        OrderItemDTO dto = new OrderItemDTO();

                        dto.setOrderItemId(item.getOrderItemId());
                        dto.setProductId(item.getProductId());
                        dto.setProductName(product.getProductName());
                        dto.setImageUrl(product.getImageUrl());
                        dto.setQuantity(item.getQuantity());
                        dto.setPrice(item.getPrice());
                        dto.setTotal(
                                        item.getPrice() * item.getQuantity());

                        return dto;

                }).toList();
        }

        // ================= ADMIN - GET ALL ORDERS =================

        public List<AdminOrderDTO> getAllOrders() {

                List<OrderModel> orders = orderRepository.findAll();

                return orders.stream().map(order -> {

                        // ================= CUSTOMER NAME =================

                        String customerName = (order.getFirstName() +
                                        " " +
                                        order.getLastName()).trim();

                        // ================= PRODUCT NAME =================

                        String productName = "Unknown Product";

                        Optional<OrderItemModel> orderItem = orderItemRepository
                                        .findFirstByOrderIdOrderByOrderItemIdAsc(
                                                        order.getOrderId());

                        if (orderItem.isPresent()) {

                                ProductModel product = productRepository
                                                .findById(
                                                                orderItem.get().getProductId())
                                                .orElse(null);

                                if (product != null) {

                                        productName = product.getProductName();

                                }

                        }

                        // ================= DATE =================

                        String orderDate = order.getOrderDate() != null
                                        ? order.getOrderDate().toString()
                                        : null;

                        // ================= DTO =================

                        return new AdminOrderDTO(

                                        order.getOrderId(),

                                        customerName,

                                        productName,

                                        orderDate,

                                        order.getTotalAmount(),

                                        order.getStatus()

                        );

                }).toList();

        }

        // ================= ADMIN - RECENT ORDERS =================

        public List<RecentOrderDTO> getRecentOrders() {

                List<OrderModel> orders = orderRepository.findTop3ByOrderByOrderIdDesc();

                return orders.stream().map(order -> {

                        String customerName = order.getFirstName() + " "
                                        + order.getLastName();

                        String productName = "Unknown Product";

                        var orderItem = orderItemRepository
                                        .findFirstByOrderIdOrderByOrderItemIdAsc(
                                                        order.getOrderId());

                        if (orderItem.isPresent()) {

                                ProductModel product = productRepository
                                                .findById(
                                                                orderItem.get().getProductId())
                                                .orElse(null);

                                if (product != null) {

                                        productName = product.getProductName();

                                }
                        }

                        return new RecentOrderDTO(

                                        order.getOrderId(),

                                        customerName,

                                        productName,

                                        order.getStatus(),

                                        order.getTotalAmount());

                }).toList();
        }

        // ================= ADMIN - GET ORDER DETAILS =================

        public OrderModel getOrderByIdForAdmin(Long orderId) {

                return orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

        }

        // ================= ADMIN - UPDATE ORDER STATUS =================

        public OrderModel updateOrderStatus(
                        Long orderId,
                        String status) {

                OrderModel order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                order.setStatus(status);

                return orderRepository.save(order);
        }
}
