import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-zinc-100">আবার স্বাগতম!</h1>
                <p className="mt-1 text-sm text-zinc-500">তোমার অ্যাকাউন্টে লগইন করো</p>
            </div>
            <LoginForm />
        </div>
    );
}
