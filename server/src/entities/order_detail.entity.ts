import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Trainer } from './trainer.entity'; // Liên kết đến Trainer
import { GymPackage } from './gymPackage.entity'; // Liên kết đến GymPackage

@Entity('order_details') // Tên bảng trong cơ sở dữ liệu
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Order, order => order.orderDetails)
    @JoinColumn({ name: 'order_id' }) // Cột order_id trong bảng order_details
    order!: Order;

    @ManyToOne(() => Trainer, trainer => trainer.orderDetails, { nullable: true })
    @JoinColumn({ name: 'trainer_id' }) // Cột trainer_id trong bảng order_details
    trainer?: Trainer; // Liên kết đến Trainer, có thể null nếu không cần

    @ManyToOne(() => GymPackage, gymPackage => gymPackage.orderDetails)
    @JoinColumn({ name: 'package_id' }) // Cột package_id trong bảng order_details
    gymPackage!: GymPackage; // Liên kết đến GymPackage

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number; // Giá cho mỗi gói tập

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}
