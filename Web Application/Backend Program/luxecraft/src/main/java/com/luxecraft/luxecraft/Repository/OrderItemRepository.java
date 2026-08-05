package com.luxecraft.luxecraft.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.luxecraft.luxecraft.Model.OrderItemModel;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItemModel, Long> {
    List<OrderItemModel> findByOrderId(Long orderId);

    Optional<OrderItemModel> findFirstByOrderIdOrderByOrderItemIdAsc(Long orderId);

    @Query("SELECT COALESCE(SUM(o.quantity),0) FROM OrderItemModel o")
    long getTotalProductsSold();
}
