'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, Coins, Zap, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMe } from '@/hooks/use-me';
import apiClient from '@/lib/api-client';

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
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                    <ShoppingBag size={20} className="text-amber-400" />
                </div>
                <div className="flex-1">
                    <h1 className="text-lg font-bold text-zinc-100">শপ</h1>
                    <p className="text-xs text-zinc-500">কয়েন দিয়ে ক্রয় করো</p>
                </div>
                {/* Coin balance */}
                <div className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-1.5">
                    <span className="text-amber-400">🪙</span>
                    <span className="text-sm font-bold text-amber-400">{coins}</span>
                </div>
            </div>

            {/* How to earn coins */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-sm font-semibold text-zinc-100 mb-2">কয়েন কীভাবে পাবো?</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                        { icon: '✓', label: 'কুইজ সম্পন্ন', coins: '+10' },
                        { icon: '🔥', label: 'ডেইলি স্ট্রিক', coins: '+5' },
                        { icon: '🎯', label: 'পারফেক্ট স্কোর', coins: '+20' },
                    ].map((item) => (
                        <div key={item.label} className="rounded-lg bg-zinc-800 p-3">
                            <p className="text-lg">{item.icon}</p>
                            <p className="text-xs text-zinc-400 mt-1">{item.label}</p>
                            <p className="text-xs font-bold text-amber-400">{item.coins}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shop items */}
            <div className="space-y-3">
                {SHOP_ITEMS.map((item) => {
                    const canAfford = coins >= item.cost;
                    const isDone = purchased.has(item.id);
                    const isLoading = purchasing === item.id;
                    return (
                        <div key={item.id} className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                            <span className="text-3xl">{item.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-zinc-100">{item.name}</p>
                                <p className="text-xs text-zinc-500 mt-0.5">{item.description}</p>
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
                                    isDone ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                                    !canAfford ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' :
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
    );
}
