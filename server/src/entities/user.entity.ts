import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { Role } from './role.entity';
import { UserGymPackage } from './user_gymPackage.entity';
import { Order } from './order.entity'; // Liên kết đến bảng Order

@Entity('users') // 'users' là tên bảng trong cơ sở dữ liệu
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    username!: string;

    @Column({ length: 255 })
    email!: string;

    @Column()
    password!: string;

    @Column()
    refresh_token!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    // Thêm quan hệ với bảng Role
    @ManyToOne(() => Role, role => role.id)
    @JoinColumn({ name: 'role_id' }) // Cột role_id trong bảng users
    role!: Role;

    @OneToMany(() => UserGymPackage, userGymPackage => userGymPackage.user)
    gymPackages!: UserGymPackage[];

    @OneToMany(() => Order, order => order.user)
    orders!: Order[]; // Quan hệ với bảng Order
}
