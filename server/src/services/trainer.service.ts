// src/service/trainer.service.ts
import { AppDataSource } from '../database/db';
import { Trainer } from '../entities/trainer.entity';
import { Service } from '../entities/service.entity'; // Import Trainer entity
import { Repository } from 'typeorm';
import { TrainerDTO} from '../dto/trainer.dto'; // Import DTOs

export class TrainerService {
    private trainerRepository: Repository<Trainer>;
    private serviceRepository: Repository<Service>;

    constructor(
        trainerRepository: Repository<Trainer> = AppDataSource.getRepository(Trainer), 
        serviceRepository: Repository<Service> = AppDataSource.getRepository(Service)// Khởi tạo với repository mặc định
    ) {
        this.trainerRepository = trainerRepository; 
        this.serviceRepository = serviceRepository;// Gán repository vào biến instance
    }

    // Lấy tất cả huấn luyện viên
    async getAll(): Promise<Trainer[]> {
        return await this.trainerRepository.find(); // Lấy tất cả huấn luyện viên
    }

    // Lấy huấn luyện viên theo ID service
    async getById(id: number): Promise<Trainer | null> {
        return await this.trainerRepository.findOne({
            where: { id }
        });
    }

    // Tạo mới huấn luyện viên
    async create(trainerData: TrainerDTO, imageFile?: Express.Multer.File): Promise<Trainer> {
        const service = await this.serviceRepository.findOne({
            where: { id: trainerData.serviceId },
        });
    
        if (!service) {
            throw new Error('Service not found');
        }
        const trainer = this.trainerRepository.create({
            ...trainerData,
            service,
            image: imageFile ? imageFile.filename : undefined
        });
        return await this.trainerRepository.save(trainer);
    }
   
    async getByServiceId(serviceId: number): Promise<Trainer[]> {
        return await this.trainerRepository.find({
            where: { service: { id: serviceId } },  // Lọc theo serviceId
            relations: ['service'] // Lấy thông tin service
        });
    }

    // Xóa huấn luyện viên theo ID
    async delete(id: number): Promise<void> {
        await this.trainerRepository.delete(id); // Xóa huấn luyện viên
    }
}
