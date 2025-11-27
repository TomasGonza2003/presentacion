package com.tienda.backend.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private List<OrderDetailRequest> details;

    @Data
    public static class OrderDetailRequest {
        private Long productId;
        private Integer quantity;
    }
}
