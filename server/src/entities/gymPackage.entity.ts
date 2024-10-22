import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OrderDetail } from './order_detail.entity'; // Liên kết với OrderDetail
import { Service } from './service.entity';

@Entity('gym_package') // Tên bảng trong cơ sở dữ liệu
export class GymPackage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string; // Tên gói tập, ví dụ: "Basic", "Premium"

    @Column({ type: 'text', nullable: true })
    description?: string; // Mô tả gói tập

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number; // Giá của gói tập

  

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.gymPackage)
    orderDetails!: OrderDetail[]; // Quan hệ với bảng OrderDetail

    @ManyToOne(() => Service, service => service.gymPackages) // Liên kết với Service
    @JoinColumn({ name: 'service_id' }) // Cột liên kết với bảng Service
    service!: Service; // Dịch vụ tương ứng
}
