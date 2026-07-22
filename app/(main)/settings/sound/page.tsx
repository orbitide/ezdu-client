'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getUserConfig, saveUserConfig } from '@/lib/api/users';
import type { UserConfigDto } from '@/types/api';
import { cn } from '@/lib/utils';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? 'bg-primary' : 'bg-muted'}`}
        >
            <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${on ? 'left-4' : 'left-0.5'}`} />
        </button>
    );
}

function VariantPicker({
    label,
    value,
    onChange,
    disabled,
}: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    disabled: boolean;
}) {
    return (
        <div className={`px-4 py-3.5 ${disabled ? 'opacity-40' : ''}`}>
            <p className="text-sm font-medium text-foreground mb-2">{label}</p>
            <div className="flex gap-2">
                {[
                    { v: 1, label: 'স্ট্যান্ডার্ড' },
                    { v: 2, label: 'বিকল্প' },
                ].map(({ v, label: vLabel }) => (
                    <button
                        key={v}
                        disabled={disabled}
                        onClick={() => onChange(v)}
                        className={cn(
                            'flex-1 rounded-lg border py-2 text-sm font-medium transition-colors',
                            value === v
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-muted text-muted-foreground hover:border-ring/40'
                        )}
                    >
                        {vLabel}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function SoundSettingsPage() {
    const [config, setConfig] = useState<UserConfigDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getUserConfig()
            .then(setConfig)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const save = async (patch: Partial<UserConfigDto>) => {
        setSaving(true);
        try {
            await saveUserConfig(patch);
        } catch {
            // revert happens via setConfig below
        } finally {
            setSaving(false);
        }
    };

    const handleSoundToggle = () => {
        if (!config) return;
        const next = !(config.soundEnabled ?? true);
        setConfig({ ...config, soundEnabled: next });
        save({ soundEnabled: next });
    };

    const handleVariant = (key: 'soundCorrectVariant' | 'soundWrongVariant' | 'soundCelebrationVariant', v: number) => {
        if (!config) return;
        setConfig({ ...config, [key]: v });
        save({ [key]: v });
    };

    const soundOn = config?.soundEnabled ?? true;

    return (
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <Link href="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-lg font-bold text-foreground">শব্দ</h1>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 size={24} className="animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
                            {/* Master sound toggle */}
                            <div className="flex items-center gap-3 px-4 py-3.5">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground">শব্দ চালু</p>
                                    <p className="text-xs text-muted-foreground">উত্তরের সময় শব্দ বাজাও</p>
                                </div>
                                <Toggle on={soundOn} onToggle={handleSoundToggle} />
                            </div>

                            {/* Variant pickers */}
                            <VariantPicker
                                label="সঠিক উত্তর"
                                value={config?.soundCorrectVariant ?? 1}
                                onChange={(v) => handleVariant('soundCorrectVariant', v)}
                                disabled={!soundOn}
                            />
                            <VariantPicker
                                label="ভুল উত্তর"
                                value={config?.soundWrongVariant ?? 1}
                                onChange={(v) => handleVariant('soundWrongVariant', v)}
                                disabled={!soundOn}
                            />
                            <VariantPicker
                                label="উদযাপন"
                                value={config?.soundCelebrationVariant ?? 1}
                                onChange={(v) => handleVariant('soundCelebrationVariant', v)}
                                disabled={!soundOn}
                            />
                        </div>
                    )}

                    {saving && (
                        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                            <Loader2 size={12} className="animate-spin" /> সেভ হচ্ছে...
                        </p>
                    )}
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}
