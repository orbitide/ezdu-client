'use client';

import { useState } from 'react';
import { ArrowLeft, Info, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useMe } from '@/hooks/use-me';
import apiClient from '@/lib/api-client';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

const FREEZE_BLUE = '#5BC5FF';

const HOW_IT_WORKS = [
    {
        title: 'আগে থেকে ফ্রিজ কিনে রাখো',
        description: 'EC দিয়ে স্ট্রিক ফ্রিজ স্টক করে রাখো — ১ বা ২ দিনের অপশন',
    },
    {
        title: 'মিস হলে অটো অ্যাক্টিভ',
        description: 'কোনো দিন পড়াশোনা মিস করলে ফ্রিজ নিজে থেকে অ্যাক্টিভ হবে',
    },
    {
        title: 'স্ট্রিক বেঁচে যায়',
        description: 'তোমার স্ট্রিক রিসেট হবে না, পরের দিন থেকে আবার চালু',
    },
];

interface PurchaseRowProps {
    duration: 1 | 2;
    label: string;
    cost: number;
    coin: number;
    freezeCount: number;
    purchasing: number | null;
    onPurchase: (duration: 1 | 2) => void;
}

function PurchaseRow({ duration, label, cost, coin, freezeCount, purchasing, onPurchase }: PurchaseRowProps) {
    const canBuyByCount = freezeCount + duration <= 2;
    const hasEnoughCoin = coin >= cost;
    const isIdle = purchasing === null;
    const canBuy = canBuyByCount && hasEnoughCoin && isIdle;
    const isLoading = purchasing === duration;

    return (
        <div className={cn(
            'flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors',
            canBuy ? 'border-[#5BC5FF]/30 bg-[#5BC5FF]/5' : 'border-border bg-card/60'
        )}>
            {/* Icon(s) */}
            <div className="flex shrink-0 items-center" style={{ width: duration === 2 ? 40 : 28 }}>
                <Image src="/icons/streak_freeze.svg" alt="" width={26} height={26} style={{ opacity: canBuy ? 1 : 0.3 }} />
                {duration === 2 && (
                    <Image src="/icons/streak_freeze.svg" alt="" width={26} height={26} style={{ opacity: canBuy ? 1 : 0.3, marginLeft: -10 }} />
                )}
            </div>

            <span className={cn('flex-1 text-sm font-bold', canBuy ? 'text-foreground' : 'text-muted-foreground')}>
                {label}
            </span>

            {/* Buy button */}
            <button
                onClick={() => canBuy && onPurchase(duration)}
                disabled={!canBuy}
                className={cn(
                    'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors',
                    canBuy
                        ? 'border-[#5BC5FF]/40 bg-[#5BC5FF]/12 text-[#5BC5FF] hover:bg-[#5BC5FF]/20'
                        : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                )}
            >
                {isLoading ? (
                    <Loader2 size={12} className="animate-spin" />
                ) : (
                    <>
                        <Image src="/icons/coin.svg" alt="" width={13} height={13} style={{ opacity: canBuy ? 1 : 0.4 }} />
                        <span>
                            {!canBuyByCount ? 'পূর্ণ' : !hasEnoughCoin ? 'EC কম' : `${cost} EC`}
                        </span>
                    </>
                )}
            </button>
        </div>
    );
}

export default function StreakFreezePage() {
    const { data: meData } = useMe();
    const coin = meData?.coin ?? 0;
    const freezeCount = meData?.streakFreezeCount ?? 0;

    const [purchasing, setPurchasing] = useState<1 | 2 | null>(null);
    const [toast, setToast] = useState<string | null>(null);
    const [showHowItWorks, setShowHowItWorks] = useState(false);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handlePurchase = async (duration: 1 | 2) => {
        const cost = duration === 1 ? 10 : 20;
        if (coin < cost) { showToast('পর্যাপ্ত EC নেই'); return; }
        setPurchasing(duration);
        try {
            await apiClient.post('/payments/spend-ec', { itemType: 'streak_freeze', duration, amount: cost });
            showToast('স্ট্রিক ফ্রিজ কেনা হয়েছে!');
        } catch {
            showToast('কিনতে সমস্যা হয়েছে');
        } finally {
            setPurchasing(null);
        }
    };

    const maxReached = freezeCount >= 2;

    return (
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/shop"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                        <h1 className="flex-1 text-lg font-bold text-foreground">স্ট্রিক ফ্রিজ</h1>
                        {/* Coin balance */}
                        <div className="flex items-center gap-1.5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-1.5">
                            <Image src="/icons/coin.svg" alt="" width={15} height={15} />
                            <span className="text-sm font-bold text-amber-400">{coin} EC</span>
                        </div>
                    </div>

                    {/* Hero */}
                    <div className="flex flex-col items-center gap-3 py-4">
                        <div
                            className="flex h-20 w-20 items-center justify-center rounded-full border"
                            style={{
                                background: `radial-gradient(circle, ${FREEZE_BLUE}28 0%, ${FREEZE_BLUE}08 100%)`,
                                borderColor: `${FREEZE_BLUE}38`,
                            }}
                        >
                            <Image src="/icons/streak_freeze.svg" alt="freeze" width={42} height={42} />
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-foreground">স্ট্রিক ফ্রিজ</p>
                            <p className="mt-1 text-sm text-muted-foreground">একদিন মিস করলেও তোমার স্ট্রিক বাঁচিয়ে রাখবে।</p>
                        </div>
                    </div>

                    {/* Freeze count card */}
                    <div className={cn(
                        'flex items-center gap-4 rounded-xl border px-4 py-4',
                        freezeCount > 0
                            ? `border-[${FREEZE_BLUE}]/35 bg-[${FREEZE_BLUE}]/08`
                            : 'border-border bg-card'
                    )}
                        style={freezeCount > 0 ? { borderColor: `${FREEZE_BLUE}38`, background: `${FREEZE_BLUE}08` } : undefined}
                    >
                        {/* Slots */}
                        <div className="flex gap-1.5">
                            {[1, 2].map((slot) => (
                                <Image
                                    key={slot}
                                    src="/icons/streak_freeze.svg"
                                    alt=""
                                    width={28}
                                    height={28}
                                    style={{ opacity: freezeCount >= slot ? 1 : 0.2 }}
                                />
                            ))}
                        </div>
                        <div className="flex-1" />
                        <div className="text-right">
                            <p className="text-[11px] text-muted-foreground">ফ্রিজ সুরক্ষা</p>
                            {freezeCount > 0 ? (
                                <p className="text-2xl font-extrabold" style={{ color: FREEZE_BLUE }}>
                                    {freezeCount}{' '}
                                    <span className="text-sm font-semibold text-muted-foreground">দিন</span>
                                </p>
                            ) : (
                                <p className="text-sm font-bold text-muted-foreground">কোনো ফ্রিজ নেই</p>
                            )}
                        </div>
                    </div>

                    {/* Purchase options */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <p className="text-sm font-bold text-foreground">ফ্রিজ কিনো</p>
                            {maxReached && (
                                <p className="text-xs text-muted-foreground">সর্বোচ্চ ২ দিনের ফ্রিজ রাখা যায়।</p>
                            )}
                        </div>
                        <PurchaseRow
                            duration={1} label="১ দিন" cost={10}
                            coin={coin} freezeCount={freezeCount} purchasing={purchasing} onPurchase={handlePurchase}
                        />
                        <PurchaseRow
                            duration={2} label="২ দিন" cost={20}
                            coin={coin} freezeCount={freezeCount} purchasing={purchasing} onPurchase={handlePurchase}
                        />
                    </div>

                    {/* How it works */}
                    <button
                        onClick={() => setShowHowItWorks((v) => !v)}
                        className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-left transition-colors hover:bg-muted/60"
                    >
                        <Info size={18} className="text-muted-foreground shrink-0" />
                        <span className="flex-1 text-sm font-semibold text-foreground">কীভাবে কাজ করে</span>
                        <span className="text-xs text-muted-foreground">{showHowItWorks ? '▲' : '▼'}</span>
                    </button>

                    {showHowItWorks && (
                        <div className="space-y-2 -mt-2">
                            {HOW_IT_WORKS.map((step, i) => (
                                <div key={i} className="flex gap-3 rounded-xl border border-border bg-card px-4 py-3.5">
                                    <div
                                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                                        style={{ background: `${FREEZE_BLUE}22`, color: FREEZE_BLUE }}
                                    >
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">{step.title}</p>
                                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Toast */}
                    {toast && (
                        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl border border-border bg-muted px-4 py-2.5 text-sm font-medium text-foreground shadow-xl z-50">
                            {toast}
                        </div>
                    )}
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}
