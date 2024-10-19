import { Router, Request, Response } from 'express';
import { AuthService } from '../services/auth.service'; 
import { AppDataSource } from '../database/db';
import { User } from '../entities/user.entity'; // Đảm bảo rằng bạn đã import entity User


const userRepository = AppDataSource.getRepository(User);// Lấy repository của User
const authService = new AuthService(userRepository); // Tạo instance của AuthService

// Đăng ký
// Đăng ký
const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body); // Gọi phương thức register từ instance
        res.status(201).json({
            Status: 'Success',
            Message: 'Đăng ký thành công',
            user // Có thể trả về thêm thông tin người dùng nếu cần
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ Status: 'Error', Message: error.message }); // Cập nhật trạng thái
        } else {
            res.status(500).json({ Status: 'Error', Message: 'An unknown error occurred' }); // Cập nhật trạng thái
        }
    }
};


// Đăng nhập
const login = async (req: Request, res: Response) => {
    try {
        const tokens = await authService.login(req.body); // Gọi phương thức login từ instance
        res.json(tokens);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Làm mới token
const refreshToken = async (req: Request, res: Response) => {
    try {
        const tokens = await authService.refreshToken(req.body.refresh_token); // Gọi phương thức refreshToken từ instance
        res.json(tokens);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export default {
    register,
    login,
    refreshToken,
};
