import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderDetail } from './order_detail.entity'; // Liên kết với OrderDetail

@Entity('trainer') // Tên bảng trong cơ sở dữ liệu
export class Trainer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string; // Tên của huấn luyện viên

    @Column({ type: 'varchar', length: 255 })
    gender!: string; // Giới tính của huấn luyện viên

    @Column({ type: 'int' })
    experience_years!: number; // Số năm kinh nghiệm

    @Column({ type: 'text', nullable: true })
    bio?: string; // Thông tin mô tả ngắn về huấn luyện viên

    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string; // Đường dẫn đến ảnh đại diện

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.trainer)
    orderDetails!: OrderDetail[]; // Quan hệ với bảng OrderDetail
}
