'use client';

import { useState } from 'react';
import { ArrowLeft, Crown, Loader2, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useMe } from '@/hooks/use-me';
import apiClient from '@/lib/api-client';
import { SITE } from '@/config/site';

const PRO_PURPLE = '#A78BFA';

interface ProOption {
    duration: 1 | 3;
    label: string;
    cost: number;
    best?: boolean;
}

const PRO_OPTIONS: ProOption[] = [
    { duration: 1, label: '১ দিন', cost: 100 },
    { duration: 3, label: '৩ দিন', cost: 290, best: true },
];

function ProButton({
    option,
    coin,
    purchasing,
    onPurchase,
}: {
    option: ProOption;
    coin: number;
    purchasing: number | null;
    onPurchase: (option: ProOption) => void;
}) {
    const hasEnoughCoin = coin >= option.cost;
    const isIdle = purchasing === null;
    const canBuy = hasEnoughCoin && isIdle;
    const isLoading = purchasing === option.duration;

    return (
        <button
            onClick={() => canBuy && onPurchase(option)}
            disabled={!canBuy}
            className={cn(
                'flex flex-1 flex-col items-center gap-1.5 rounded-xl border px-3 py-3.5 transition-colors',
                option.best
                    ? 'border-[#A78BFA]/40 bg-[#A78BFA]/10 hover:bg-[#A78BFA]/16'
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700',
                !canBuy && 'cursor-not-allowed opacity-60'
            )}
        >
            <span className="text-sm font-bold text-zinc-100">{option.label}</span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                {isLoading ? (
                    <Loader2 size={12} className="animate-spin" />
                ) : (
                    <>
                        <Image src="/icons/coin.svg" alt="" width={13} height={13} />
                        {hasEnoughCoin ? `${option.cost} EC` : 'EC কম'}
                    </>
                )}
            </span>
        </button>
    );
}

export default function CoinsPage() {
    const { data: meData } = useMe();
    const coin = meData?.coin ?? 0;

    const [purchasing, setPurchasing] = useState<1 | 3 | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handlePurchase = async (option: ProOption) => {
        if (coin < option.cost) { showToast('পর্যাপ্ত EC নেই'); return; }
        setPurchasing(option.duration);
        try {
            await apiClient.post('/payments/spend-ec', {
                itemType: 'pro_trial',
                duration: option.duration,
                amount: option.cost,
            });
            showToast(`Pro ${option.label}ের জন্য আনলক হয়েছে!`);
        } catch {
            showToast('কিছু একটা সমস্যা হয়েছে');
        } finally {
            setPurchasing(null);
        }
    };

    return (
        <div className="mx-auto max-w-lg px-4 py-6 space-y-5 lg:px-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link
                    href="/dashboard"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                >
                    <ArrowLeft size={18} />
                </Link>
                <h1 className="flex-1 text-lg font-bold text-zinc-100">কয়েন</h1>
                {/* Coin balance */}
                <div className="flex items-center gap-1.5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-1.5">
                    <Image src="/icons/coin.svg" alt="" width={15} height={15} />
                    <span className="text-sm font-bold text-amber-400">{coin} EC</span>
                </div>
            </div>

            {/* Pro trial card */}
            <div
                className="flex flex-col items-center gap-4 rounded-2xl border px-6 py-6"
                style={{
                    background: `radial-gradient(circle at top, ${PRO_PURPLE}1A 0%, transparent 70%)`,
                    borderColor: `${PRO_PURPLE}4D`,
                }}
            >
                <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ background: `${PRO_PURPLE}1F` }}
                >
                    <Crown size={32} style={{ color: PRO_PURPLE }} />
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold text-zinc-100">Pro ট্রাই করো</p>
                    <p className="mt-1 text-sm text-zinc-500">EC দিয়ে সব প্রিমিয়াম ফিচার আনলক করো</p>
                </div>
                <div className="flex w-full gap-2.5">
                    {PRO_OPTIONS.map((option) => (
                        <ProButton
                            key={option.duration}
                            option={option}
                            coin={coin}
                            purchasing={purchasing}
                            onPurchase={handlePurchase}
                        />
                    ))}
                </div>
            </div>

            {/* Earn EC */}
            <div className="space-y-2">
                <p className="px-1 text-sm font-bold text-zinc-100">ইসি (EC) অর্জন করো</p>
                <a
                    href={SITE.googlePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3.5 transition-colors hover:border-zinc-700 hover:bg-zinc-800/60"
                >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-emerald-400">
                        <PlayCircle size={24} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-zinc-100">অ্যাড দেখে EC নাও</p>
                        <p className="mt-0.5 text-xs text-zinc-500">মোবাইল অ্যাপে অ্যাড দেখে সর্বোচ্চ ৫ EC পর্যন্ত পাও</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400">
                        <Image src="/icons/coin.svg" alt="" width={12} height={12} />
                        +5 ইসি
                    </div>
                </a>
            </div>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-100 shadow-xl z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}
