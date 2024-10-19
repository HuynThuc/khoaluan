// src/service/order.service.ts
import { AppDataSource } from '../database/db';
import { Order } from '../entities/order.entity';
import { OrderDetail } from '../entities/order_detail.entity';
import { GymPackage } from '../entities/gymPackage.entity';
import { Trainer } from '../entities/trainer.entity';
import { Repository } from 'typeorm';
import { OrderDTO, OrderDetailDTO } from '../dto/order.dto'; // Import DTO

export class OrderService {
    private orderRepository: Repository<Order>;
    private orderDetailRepository: Repository<OrderDetail>;
    private gymPackageRepository: Repository<GymPackage>;
    private trainerRepository: Repository<Trainer>;

    constructor(
        orderRepository: Repository<Order> = AppDataSource.getRepository(Order),
        orderDetailRepository: Repository<OrderDetail> = AppDataSource.getRepository(OrderDetail),
        gymPackageRepository: Repository<GymPackage> = AppDataSource.getRepository(GymPackage),
        trainerRepository: Repository<Trainer> = AppDataSource.getRepository(Trainer),
    ) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.gymPackageRepository = gymPackageRepository;
        this.trainerRepository = trainerRepository;
    }

    // Tạo mới order và order details
    async createOrder(orderData: OrderDTO, orderDetailsData: OrderDetailDTO[]): Promise<Order> {
        const { userId, totalAmount, status } = orderData;

        // Tạo order
        const order = this.orderRepository.create({ user: { id: userId }, totalAmount, status });
        const savedOrder = await this.orderRepository.save(order);

        // Kiểm tra và xử lý orderDetailsData
        if (!Array.isArray(orderDetailsData) || orderDetailsData.length === 0) {
            throw new Error('Order details data must be a non-empty array');
        }

        // Tạo order details
        await Promise.all(orderDetailsData.map(async (detail) => {
            const gymPackage = await this.gymPackageRepository.findOne({ where: { id: detail.gymPackageId } });
            const trainer = await this.trainerRepository.findOne({ where: { id: detail.trainerId } });

            if (!gymPackage || !trainer) {
                throw new Error('Gym package or trainer not found');
            }

            const orderDetail = this.orderDetailRepository.create({
                order: savedOrder, // Tham chiếu đến order đã được lưu
                gymPackage,        // Tham chiếu trực tiếp đến gymPackage
                trainer,           // Tham chiếu trực tiếp đến trainer
                price: detail.price, // Giá
            });

            await this.orderDetailRepository.save(orderDetail);
        }));

        return savedOrder;
    }
}
