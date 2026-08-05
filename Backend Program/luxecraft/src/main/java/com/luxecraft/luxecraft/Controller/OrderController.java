package com.luxecraft.luxecraft.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luxecraft.luxecraft.Dto.AdminOrderDTO;
import com.luxecraft.luxecraft.Dto.OrderItemDTO;
import com.luxecraft.luxecraft.Dto.OrderRequestDTO;
import com.luxecraft.luxecraft.Dto.RecentOrderDTO;
import com.luxecraft.luxecraft.Model.CustomerModel;
import com.luxecraft.luxecraft.Model.OrderItemModel;
import com.luxecraft.luxecraft.Model.OrderModel;
import com.luxecraft.luxecraft.Repository.CustomerRepository;
import com.luxecraft.luxecraft.Repository.OrderItemRepository;
import com.luxecraft.luxecraft.Service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
        @Autowired
        private OrderService orderService;

        @Autowired
        private OrderItemRepository orderItemRepository;

        @Autowired
        private CustomerRepository customerRepository;

        // ================= PLACE ORDER =================

        @PostMapping("/place")
        public OrderModel placeOrder(@RequestBody OrderRequestDTO orderRequest, Authentication authentication) {

                String email = authentication.getName();

                CustomerModel customer = customerRepository
                                .findByEmail(email)
                                .orElseThrow(() -> new RuntimeException(
                                                "Customer not found"));

                return orderService.placeOrder(
                                customer.getCustomerId(), orderRequest);
        }

        @GetMapping
        public List<OrderModel> getMyOrders(Authentication authentication) {

                String email = authentication.getName();

                CustomerModel customer = customerRepository
                                .findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("Customer not found"));

                return orderService.getCustomerOrders(
                                customer.getCustomerId());
        }

        // ================= GET ORDER DETAILS =================

        @GetMapping("/{orderId}")
        public OrderModel getOrderDetails(
                        @PathVariable Long orderId,
                        Authentication authentication) {

                String email = authentication.getName();

                CustomerModel customer = customerRepository
                                .findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("Customer not found"));

                return orderService.getOrderDetails(
                                customer.getCustomerId(),
                                orderId);
        }

        @GetMapping("/{orderId}/items")
        public List<OrderItemDTO> getOrderItems(
                        @PathVariable Long orderId,
                        Authentication authentication) {

                String email = authentication.getName();

                CustomerModel customer = customerRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("Customer not found"));

                return orderService.getOrderItems(
                                customer.getCustomerId(),
                                orderId);
        }

        // ================= ADMIN - GET ALL ORDERS =================

        @GetMapping("/admin/all")
        public List<AdminOrderDTO> getAllOrders() {

                return orderService.getAllOrders();

        }

        // ================= ADMIN - RECENT ORDERS =================

        @GetMapping("/admin/recent")
        public List<RecentOrderDTO> getRecentOrders() {

                return orderService.getRecentOrders();

        }

        @GetMapping("/admin/customer/{customerId}")
        public List<OrderModel> getCustomerOrdersForAdmin(
                        @PathVariable Long customerId) {

                return orderService.getCustomerOrders(customerId);

        }

        // ================= ADMIN - GET ORDER DETAILS =================

        @GetMapping("/admin/{orderId}")
        public OrderModel getOrderByIdForAdmin(
                        @PathVariable Long orderId) {

                return orderService.getOrderByIdForAdmin(orderId);

        }

        // ================= ADMIN - UPDATE ORDER STATUS =================

        @PutMapping("/admin/{orderId}/status")
        public OrderModel updateOrderStatus(
                        @PathVariable Long orderId,
                        @RequestBody String status) {

                return orderService.updateOrderStatus(
                                orderId,
                                status.replace("\"", ""));
        }

        // ================= ADMIN - GET ORDER ITEMS =================

        @GetMapping("/admin/{orderId}/items")
        public List<OrderItemModel> getOrderItemsForAdmin(
                        @PathVariable Long orderId) {

                return orderItemRepository.findByOrderId(orderId);

        }
}
