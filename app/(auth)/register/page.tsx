import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-zinc-100">অ্যাকাউন্ট তৈরি করো</h1>
                <p className="mt-1 text-sm text-zinc-500">বিনামূল্যে শুরু করো, আজই!</p>
            </div>
            <RegisterForm />
        </div>
    );
}
