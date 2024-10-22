import { AppDataSource } from '../database/db';
import { GymPackage } from '../entities/gymPackage.entity'; // Import GymPackage entity
import { Service } from '../entities/service.entity';
import { Repository } from 'typeorm';
import { GymPackageDTO } from '../dto/gymPackage.dto'; // Tạo DTO cho GymPackage nếu cần

export class GymPackageService {
    private gymPackageRepository = AppDataSource.getRepository(GymPackage);
    private serviceRepository = AppDataSource.getRepository(Service);

    constructor(
        gymPackageRepository: Repository<GymPackage> = AppDataSource.getRepository(GymPackage),
        serviceRepository: Repository<Service> = AppDataSource.getRepository(Service)
    ) {
        this.gymPackageRepository = gymPackageRepository;
        this.serviceRepository = serviceRepository;
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

    async getByServiceId(serviceId: number): Promise<GymPackage[]> {
        return await this.gymPackageRepository.find({
            where: { service: { id: serviceId } },  // Lọc theo serviceId
            relations: ['service'] // Lấy thông tin service
        });
    }

   
  

    // Tạo mới gói tập
  // Tạo mới gói tập
  async create(gymPackageData: GymPackageDTO): Promise<GymPackage> {
    const service = await this.serviceRepository.findOne({
        where: { id: gymPackageData.serviceId },
    });

    if (!service) {
        throw new Error('Service not found');
    }

    const gymPackage = this.gymPackageRepository.create({
        ...gymPackageData,
        service,
    });

    return await this.gymPackageRepository.save(gymPackage);
} 

}
