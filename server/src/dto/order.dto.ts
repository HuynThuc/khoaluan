// src/dto/order.dto.ts

export interface OrderDTO {
    userId: number;
    totalAmount: number;
    status: string; // Ví dụ: 'pending', 'completed', 'canceled'
}

export interface OrderDetailDTO {
    gymPackageId: number;
    trainerId: number;
    quantity: number;
    price: number;
}
