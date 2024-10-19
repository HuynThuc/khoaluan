// src/service/trainer.service.ts
import { AppDataSource } from '../database/db';
import { Trainer } from '../entities/trainer.entity'; // Import Trainer entity
import { Repository } from 'typeorm';
import { TrainerDTO} from '../dto/trainer.dto'; // Import DTOs

export class TrainerService {
    private trainerRepository: Repository<Trainer>;

    constructor(
        trainerRepository: Repository<Trainer> = AppDataSource.getRepository(Trainer) // Khởi tạo với repository mặc định
    ) {
        this.trainerRepository = trainerRepository; // Gán repository vào biến instance
    }

    // Lấy tất cả huấn luyện viên
    async getAll(): Promise<Trainer[]> {
        return await this.trainerRepository.find(); // Lấy tất cả huấn luyện viên
    }

    // Lấy huấn luyện viên theo ID
    async getById(id: number): Promise<Trainer | null> {
        return await this.trainerRepository.findOne({
            where: { id }
        });
    }

    // Tạo mới huấn luyện viên
    async create(trainerData: TrainerDTO, imageFile?: Express.Multer.File): Promise<Trainer> {
        const trainer = this.trainerRepository.create({
            ...trainerData,
            image: imageFile ? imageFile.filename : undefined
        });
        return await this.trainerRepository.save(trainer);
    }
   

    // Xóa huấn luyện viên theo ID
    async delete(id: number): Promise<void> {
        await this.trainerRepository.delete(id); // Xóa huấn luyện viên
    }
}
