import { AppDataSource } from '../database/db';
import { GymPackage } from '../entities/gymPackage.entity'; // Import GymPackage entity

import { Repository } from 'typeorm';
import { GymPackageDTO } from '../dto/gymPackage.dto'; // Tạo DTO cho GymPackage nếu cần

export class GymPackageService {
    private gymPackageRepository = AppDataSource.getRepository(GymPackage);
   

    constructor(
        gymPackageRepository: Repository<GymPackage> = AppDataSource.getRepository(GymPackage), // Khởi tạo với repository mặc định
       
    ) {
        this.gymPackageRepository = gymPackageRepository; // Gán repository vào biến instance
       
    }

    // Lấy tất cả gói tập
    async getAll(): Promise<GymPackage[]> {
        return await this.gymPackageRepository.find(); // Lấy gói tập và quan hệ với service
    }

    // Lấy gói tập theo ID
    async getById(id: number): Promise<GymPackage | null> {
        return await this.gymPackageRepository.findOne({
            where: { id },
            relations: ['service'] // Lấy quan hệ với service nếu cần
        });
    }

   
  

    // Tạo mới gói tập
    async create(gymPackageData: GymPackageDTO): Promise<GymPackage> {
        // Kiểm tra xem dịch vụ có tồn tại không
        // Tạo gói tập mới với dịch vụ
        const gymPackage = this.gymPackageRepository.create({
            ...gymPackageData,
        });

        // Lưu gói tập vào cơ sở dữ liệu
        return await this.gymPackageRepository.save(gymPackage);
    }

}
