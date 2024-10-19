// src/controller/service.controller.ts
import { Router, Request, Response } from 'express';
import multer from 'multer';
import { ServiceService } from '../services/service.service';
import { AppDataSource } from '../database/db';
import { Service } from '../entities/service.entity'; // Đổi GymPackage thành Service
import { ServiceDTO } from '../dto/service.dto'; // Đổi GymPackageDTO thành ServiceDTO
import { multerConfig } from '../config/multer.config'; // Import cấu hình multer

const router = Router();
const serviceService = new ServiceService(AppDataSource.getRepository(Service));

// Khởi tạo multer với cấu hình đã import
const upload = multer(multerConfig);

// Lấy tất cả các gói dịch vụ
router.get('/getAllServices', async (req: Request, res: Response) => {
    try {
        const services = await serviceService.getAll();
        res.status(200).json(services);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

// Tạo gói dịch vụ mới
router.post('/addService', upload.single('image'), async (req: Request, res: Response) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file); // Kiểm tra thông tin file

    try {
        const serviceData: ServiceDTO = req.body; // Trích xuất dữ liệu từ body
        const service = await serviceService.create(serviceData, req.file); // Gọi service để tạo gói dịch vụ
        res.status(201).json(service); // Trả về gói dịch vụ mới được tạo
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message }); // Trả về thông báo lỗi nếu có
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});


// Lấy gói tập gym theo ID
router.get('/getService/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const gymPackage = await serviceService.getById(id);
        if (gymPackage) {
            res.status(200).json(gymPackage);
        } else {
            res.status(404).json({ message: 'Gym package not found' });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

export default router;
