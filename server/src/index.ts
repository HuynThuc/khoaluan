import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './database/db';
import authRoutes from './routes/auth.routes';
import serviceRoutes from './controller/serviceController';
import gymPackageRoutes from './controller/gymPackageController';
import trainerRoutes from './controller/trainerController';
import orderRoutes from './controller/orderController'
import ScheduleRoutes from './controller/trainerScheduleController'

import multer from 'multer';
import { multerConfig } from './config/multer.config';

const startServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // Khởi tạo Multer với cấu hình đã định nghĩa
    const upload = multer(multerConfig);

    // Đăng ký các route
    app.use('/auth', authRoutes);
    app.use('/service', serviceRoutes);
    app.use('/gymPackage', gymPackageRoutes)
    app.use('/trainer', trainerRoutes)
    app.use('/order', orderRoutes)
    app.use('/schedule', ScheduleRoutes)


    // Sử dụng multer cho tất cả các route trong gymPackageRoutes
    app.use('/service', upload.single('image'), serviceRoutes);
    app.use('/trainer', upload.single('image'), trainerRoutes);

    app.listen(3002, () => {
        console.log("Ứng dụng đang chạy trên cổng 3002");
    });
};

(async () => {
    try {
        await initializeDatabase();
        startServer();
    } catch (error) {
        console.error("Không thể khởi động server:", error);
    }
})();
