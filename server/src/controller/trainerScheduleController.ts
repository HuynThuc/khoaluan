// src/controller/trainer.controller.ts
import { Router, Request, Response } from 'express';
import { TrainerScheduleService } from '../services/trainerSchedule.service';
import { TrainerScheduleDTO } from '../dto/trainerSchedule.dto'; 
import { TrainerSchedule } from '../entities/trainerSchedule.entity';

const router = Router();
const trainerscheduleService = new TrainerScheduleService(); // Khởi tạo dịch vụ mà không cần truyền Repository

router.post('/addTrainerSchedule', async (req: Request, res: Response) => {
    try {
        const scheduleData: TrainerScheduleDTO = req.body; // Trích xuất dữ liệu từ body
        const schedule = await trainerscheduleService.createSchedule(scheduleData); // Gọi service để tạo lịch trình
        res.status(201).json(schedule); // Trả về lịch trình mới được tạo
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message }); // Trả về thông báo lỗi nếu có
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

export default router;
