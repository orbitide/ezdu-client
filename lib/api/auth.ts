import apiClient from '@/lib/api-client';
import type {
    LoginDto,
    RegisterDto,
    GoogleLoginDto,
    SendOtpDto,
    VerifyOtpDto,
    ChangePasswordDto,
    AuthResponseDto,
    UserDto,
} from '@/types/api';

export async function login(dto: LoginDto): Promise<AuthResponseDto> {
    const res = await apiClient.post('/auth/login', dto);
    return res.data;
}

export async function register(dto: RegisterDto): Promise<{ message: string }> {
    // Mobile omits `groupId` entirely when empty (register_request.dart), so a
    // class without groups doesn't post a null the backend has to interpret.
    const config = dto.config
        ? {
            classId: dto.config.classId,
            ...(dto.config.groupId ? { groupId: dto.config.groupId } : {}),
        }
        : undefined;

    const res = await apiClient.post('/auth/register', {
        name: dto.name,
        email: dto.email,
        password: dto.password,
        ...(config ? { config } : {}),
    });
    return res.data;
}

export async function verifyOtpAndRegister(dto: VerifyOtpDto): Promise<AuthResponseDto> {
    const res = await apiClient.post('/auth/verify-otp-and-register', dto);
    return res.data;
}

export async function resendOtp(dto: SendOtpDto): Promise<{ message: string }> {
    const res = await apiClient.post('/auth/resend-otp-for-register', dto);
    return res.data;
}

export async function googleLogin(dto: GoogleLoginDto): Promise<AuthResponseDto> {
    const res = await apiClient.post('/auth/google-login', dto);
    return res.data;
}

export async function sendOtp(dto: SendOtpDto): Promise<{ message: string }> {
    const res = await apiClient.post('/auth/send-otp', dto);
    return res.data;
}

export async function verifyPasswordResetOtp(dto: VerifyOtpDto): Promise<{ message: string }> {
    const res = await apiClient.post('/auth/verify-password-rest-otp', dto);
    return res.data;
}

export async function changePassword(dto: ChangePasswordDto): Promise<{ message: string }> {
    const res = await apiClient.post('/auth/change-password', dto);
    return res.data;
}

export async function getCurrentUser(): Promise<UserDto> {
    const res = await apiClient.get('/auth');
    return res.data;
}

export async function logout(): Promise<void> {
    await apiClient.get('/auth/logout');
}
