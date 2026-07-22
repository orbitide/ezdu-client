'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, Loader2, CheckCircle2, ChevronRight, Smartphone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn, toBangla } from '@/lib/utils';
import { useMe } from '@/hooks/use-me';
import apiClient from '@/lib/api-client';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

interface ShopItem {
    id: string;
    name: string;
    description: string;
    cost: number;
    icon: string;
    type: 'streak_freeze' | 'pro_trial';
}

const SHOP_ITEMS: ShopItem[] = [
    {
        id: 'streak_freeze',
        name: 'স্ট্রিক ফ্রিজ',
        description: '১ দিনের জন্য স্ট্রিক রক্ষা করো, এমনকি প্র্যাকটিস না করলেও',
        cost: 50,
        icon: '🛡️',
        type: 'streak_freeze',
    },
    {
        id: 'pro_trial',
        name: 'Pro ট্রায়াল (৭ দিন)',
        description: '৭ দিনের জন্য সব প্রিমিয়াম ফিচার আনলক করো',
        cost: 200,
        icon: '⭐',
        type: 'pro_trial',
    },
];

export default function ShopPage() {
    const { data: meData } = useMe();
    const [purchasing, setPurchasing] = useState<string | null>(null);
    const [purchased, setPurchased] = useState<Set<string>>(new Set());

    const coins = meData?.coin ?? 0;

    const handlePurchase = async (item: ShopItem) => {
        if (purchasing) return;
        setPurchasing(item.id);
        try {
            await apiClient.post('/payments/spend-ec', { itemType: item.type, amount: item.cost });
            setPurchased((s) => new Set([...s, item.id]));
        } catch {
            // Show error
        } finally {
            setPurchasing(null);
        }
    };

    return (
        <PageContainer>
        <TwoColumnShell right={<DefaultRightRail />}>
        <div className="space-y-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                        <ShoppingBag size={20} className="text-amber-400" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-foreground">শপ</h1>
                        <p className="text-xs text-muted-foreground">কয়েন দিয়ে ক্রয় করো</p>
                    </div>
                    {/* Coin balance */}
                    <div className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-1.5">
                        <span className="text-amber-400">🪙</span>
                        <span className="text-sm font-bold text-amber-400">{toBangla(coins)}</span>
                    </div>
                </div>

                {/* How to earn coins */}
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-sm font-semibold text-foreground mb-2">কয়েন কীভাবে পাবো?</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        {[
                            { icon: '✓', label: 'কুইজ সম্পন্ন', coins: '+10' },
                            { icon: '🔥', label: 'ডেইলি স্ট্রিক', coins: '+5' },
                            { icon: '🎯', label: 'পারফেক্ট স্কোর', coins: '+20' },
                        ].map((item) => (
                            <div key={item.label} className="rounded-lg bg-muted p-3">
                                <p className="text-lg">{item.icon}</p>
                                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                                <p className="text-xs font-bold text-amber-400">{toBangla(item.coins)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile app download banner */}
                <div className="rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15">
                            <Smartphone size={20} className="text-violet-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground">মোবাইল অ্যাপে আরও বেশি কয়েন পাও!</p>
                            <p className="text-xs text-muted-foreground mt-0.5">অ্যাপে প্র্যাকটিস করো, এক্সট্রা বোনাস কয়েন জিতো — যেকোনো সময়, যেকোনো জায়গায়।</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <a
                                    href="https://play.google.com/store/apps/details?id=net.ezdu.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors px-3 py-1.5 text-xs font-semibold text-white"
                                >
                                    ▶ Google Play
                                </a>
                                <a
                                    href="https://apps.apple.com/app/ezdu/id6740085500"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-muted hover:bg-muted-foreground transition-colors px-3 py-1.5 text-xs font-semibold text-foreground"
                                >
                                      App Store
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Streak Freeze quick link */}
                <Link
                    href="/streak-freeze"
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-muted/60 transition-colors"
                >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/10">
                        <Image src="/icons/streak_freeze.svg" alt="" width={26} height={26} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">স্ট্রিক ফ্রিজ</p>
                        <p className="text-xs text-muted-foreground mt-0.5">১০ বা ২০ EC দিয়ে স্ট্রিক বাঁচাও</p>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground shrink-0" />
                </Link>

                {/* Shop items */}
                <div className="space-y-3">
                    {SHOP_ITEMS.map((item) => {
                        const canAfford = coins >= item.cost;
                        const isDone = purchased.has(item.id);
                        const isLoading = purchasing === item.id;
                        return (
                            <div key={item.id} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                                <span className="text-3xl">{item.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-foreground">{item.name}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <span className="text-amber-400">🪙</span>
                                        <span className="text-sm font-bold text-amber-400">{item.cost}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handlePurchase(item)}
                                    disabled={!canAfford || isLoading || isDone}
                                    className={cn(
                                        'rounded-xl px-4 py-2 text-sm font-semibold transition-colors shrink-0',
                                        isDone ? 'bg-primary/10 text-primary border border-primary/30' :
                                        !canAfford ? 'bg-muted text-muted-foreground cursor-not-allowed' :
                                        'bg-amber-500 text-black hover:bg-amber-400'
                                    )}
                                >
                                    {isLoading ? <Loader2 size={14} className="animate-spin" /> :
                                     isDone ? <CheckCircle2 size={14} /> :
                                     !canAfford ? 'কম কয়েন' : 'কিনুন'}
                                </button>
                            </div>
                        );
                    })}
                </div>
        </div>
        </TwoColumnShell>
        </PageContainer>
    );
}
