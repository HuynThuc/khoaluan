import { User } from '../entities/user.entity'; 
import { Repository } from 'typeorm'; 
import * as bcrypt from 'bcrypt'; 
import { RegisterUserDTO } from '../dto/register-user.dto'; // Import RegisterUserDTO để định dạng và xác thực dữ liệu đầu vào
import { LoginUserDTO } from '../dto/login-user.dto';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Import jwt và JwtPayload

export class AuthService {
    private userRepository: Repository<User>;

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async register(registerUserDTO: RegisterUserDTO): Promise<User> {
        const hashPassword = await this.hashPassword(registerUserDTO.password);
        const user = await this.userRepository.save({
            ...registerUserDTO,
            refresh_token: "reresasdasd", // Gán refresh_token
            password: hashPassword
        });
        return user;
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        return await bcrypt.hash(password, salt);
    }

    async login(loginUserDTO: LoginUserDTO): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email: loginUserDTO.email } });
        if (!user) {
            throw new Error("Email does not exist");
        }

        const checkPass = await bcrypt.compare(loginUserDTO.password, user.password);
        if (!checkPass) {
            throw new Error("Password is not correct");
        }

        const payload = { id: user.id, username: user.username, role_id: user.role, email: user.email };
        return this.generateToken(payload);
    }

    private async generateToken(payload: { id: number, email: string }) {
        const access_token = jwt.sign(payload, '123456', { expiresIn: '15m' }); // Đặt thời gian hết hạn cho access token
        const refresh_token = jwt.sign(payload, '123456', { expiresIn: '1d' }); // Đặt thời gian hết hạn cho refresh token

        await this.userRepository.update(
            { email: payload.email },
            { refresh_token }
        );

        return { access_token, refresh_token };
    }

    async refreshToken(refresh_token: string): Promise<any> {
        // Xác thực refresh token
        const verify = jwt.verify(refresh_token, '123456') as JwtPayload; // Chuyển đổi kiểu sang JwtPayload
        const user = await this.userRepository.findOne({ where: { email: verify.email, refresh_token } });
    
        if (!user) {
            throw new Error('Refresh token is not valid');
        }
    
        return this.generateToken({ id: verify.id, email: verify.email });
    }
}
