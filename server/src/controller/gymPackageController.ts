import { Router, Request, Response } from 'express';
import { GymPackageService } from '../services/gymPackage.service';
import { GymPackageDTO } from '../dto/gymPackage.dto';
import { GymPackage } from '../entities/gymPackage.entity';
import { AppDataSource } from '../database/db';


const router = Router();
const gymPackageService = new GymPackageService(AppDataSource.getRepository(GymPackage)); 

// Lấy tất cả gói tập
router.get('/getAllPackage', async (req: Request, res: Response) => {
    try {
        const gymPackage = await gymPackageService.getAll();
        res.status(200).json(gymPackage);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});




// // Lấy gói tập theo ID
// router.get('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {
//         const gymPackage = await gymPackageService.getById(Number(id));
//         if (!gymPackage) {
//             return res.status(404).json({ message: 'Gói tập không tìm thấy' });
//         }
//         return res.json(gymPackage);
//     } catch (error) {
//         console.error('Lỗi khi lấy gói tập:', error);
//         return res.status(500).json({ message: 'Lỗi khi lấy gói tập', error });
//     }
// });

// Tạo gói tập mới
// Tạo gói tập mới
router.post('/addGymPackage', async (req: Request, res: Response) => {
    console.log('Request Body:', req.body);

    try {
        const gymPackageData: GymPackageDTO = req.body; // Trích xuất dữ liệu từ body
        const gymPackage = await gymPackageService.create(gymPackageData); // Gọi service để tạo gói dịch vụ
        res.status(201).json(gymPackage); // Trả về gói dịch vụ mới được tạo
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message }); // Trả về thông báo lỗi nếu có
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});


export default router;