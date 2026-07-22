import { Suspense } from 'react';
import { RegisterFlow } from '@/features/auth/components/RegisterFlow';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 size={28} className="animate-spin text-primary" /></div>}>
            <RegisterFlow />
        </Suspense>
    );
}
