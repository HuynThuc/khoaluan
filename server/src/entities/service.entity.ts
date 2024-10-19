// src/entities/service.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserGymPackage } from './user_gymPackage.entity';
 // Import GymPackage

@Entity('service')
export class Service {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    serviceName!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'text', nullable: true })
    content?: string;

    @Column({ type: 'varchar', nullable: true })
    image?: string;

    @OneToMany(() => UserGymPackage, userGymPackage => userGymPackage.service)
    users!: UserGymPackage[];

}
