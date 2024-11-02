export interface RegisterUserDTO {
    username: string;
    email: string;
    password: string;
    roleId: number; // Thêm roleId vào DTO
}
