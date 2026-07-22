'use client';

import { useEffect, useState } from 'react';
import { Loader2, Bell, Megaphone, Star, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFeed } from '@/lib/api/social';
import type { FeedItemDto } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
    achievement: { icon: <Star size={14} />, label: 'অ্যাচিভমেন্ট', color: 'text-yellow-400 bg-yellow-500/10' },
    announcement: { icon: <Megaphone size={14} />, label: 'ঘোষণা', color: 'text-blue-400 bg-blue-500/10' },
    notification: { icon: <Bell size={14} />, label: 'নোটিফিকেশন', color: 'text-muted-foreground bg-muted' },
    friendActivity: { icon: <Users size={14} />, label: 'বন্ধু', color: 'text-primary bg-primary/10' },
};

export default function FeedPage() {
    const [items, setItems] = useState<FeedItemDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFeed()
            .then(setItems)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                            <Bell size={20} className="text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-foreground">ফিড</h1>
                            <p className="text-xs text-muted-foreground">আপডেট ও ঘোষণা</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-blue-400" />
                        </div>
                    ) : items.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card p-10 text-center">
                            <Bell size={36} className="mx-auto text-muted-foreground mb-3" />
                            <p className="text-sm text-muted-foreground">এখনো কোনো আপডেট নেই</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {items.map((item) => {
                                const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.notification;
                                const timeAgo = (() => {
                                    const diff = Date.now() - new Date(item.createdAt).getTime();
                                    const h = Math.floor(diff / 3600000);
                                    if (h < 1) return 'এইমাত্র';
                                    if (h < 24) return `${h} ঘণ্টা আগে`;
                                    return `${Math.floor(h / 24)} দিন আগে`;
                                })();
                                return (
                                    <div key={item.id} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                                        <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', config.color.split(' ').slice(1).join(' '))}>
                                            <span className={config.color.split(' ')[0]}>{config.icon}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-medium text-foreground">{item.title}</p>
                                                <span className="text-xs text-muted-foreground shrink-0">{timeAgo}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-0.5">{item.body}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}
