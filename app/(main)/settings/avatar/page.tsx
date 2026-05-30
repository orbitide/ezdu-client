'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Check, Loader2, RefreshCw, Shuffle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { saveAvatar, getUserDetails } from '@/lib/api/users';
import { useAuthStore } from '@/store/auth.store';
import type { AvatarConfig } from '@/types/api';
import { AvatarSvg } from '@/features/avatar/AvatarSvg';
import {
    defaultAvatarConfig,
    studioPanels,
    swatchHex,
    formatChoiceLabel,
    hairTypes,
    headwearTypes,
    accessoriesTypes,
    facialHairTypes,
    facialHairColors,
    clotheTypes,
    graphicTypes,
    eyeTypes,
    eyebrowTypes,
    mouthTypes,
    skinColors,
    hairColors,
    fabricPalette,
    canvasBackgrounds,
} from '@/features/avatar/avatar-data';
import type { StudioPanel } from '@/features/avatar/avatar-data';

// ─── Random avatar helper ─────────────────────────────────────────────────────

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function randomConfig(): Required<AvatarConfig> {
    return {
        avatarStyle: 'Circle',
        hairType: pick(hairTypes),
        hairColor: pick(hairColors),
        headwearType: pick(headwearTypes),
        hatColor: pick(fabricPalette),
        accessoriesType: pick(accessoriesTypes),
        glassesColor: pick(fabricPalette),
        facialHairType: pick(facialHairTypes),
        facialHairColor: pick(facialHairColors),
        clotheType: pick(clotheTypes),
        clotheColor: pick(fabricPalette),
        graphicType: pick(graphicTypes),
        eyeType: pick(eyeTypes),
        eyebrowType: pick(eyebrowTypes),
        mouthType: pick(mouthTypes),
        skinColor: pick(skinColors),
        backgroundColor: pick(canvasBackgrounds),
    };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AvatarSettingsPage() {
    const { user } = useAuthStore();

    const [config, setConfig] = useState<Required<AvatarConfig>>(defaultAvatarConfig);
    const [activePanel, setActivePanel] = useState<string>('hair');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!user?.id) return;
        getUserDetails(user.id).then((profile) => {
            if (profile.avatarConfig) {
                setConfig({ ...defaultAvatarConfig, ...profile.avatarConfig });
            }
        }).catch(() => {});
    }, [user?.id]);

    const update = useCallback((key: keyof Required<AvatarConfig>, value: string) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
        setSaved(false);
    }, []);

    const handleShuffle = () => {
        setConfig(randomConfig());
        setSaved(false);
    };

    const handleReset = () => {
        setConfig(defaultAvatarConfig);
        setSaved(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveAvatar(config);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch {
            // ignore
        } finally {
            setSaving(false);
        }
    };

    const currentPanel = studioPanels.find((p) => p.id === activePanel) ?? studioPanels[0];

    return (
        <div className="flex flex-col min-h-dvh bg-zinc-950">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-zinc-800/60 px-4 py-3 shrink-0">
                <Link
                    href="/settings"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                >
                    <ArrowLeft size={18} />
                </Link>
                <h1 className="flex-1 text-sm font-bold text-zinc-100">অ্যাভাটার বিল্ডার</h1>
                <button
                    onClick={handleShuffle}
                    title="র‍্যান্ডম"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                >
                    <Shuffle size={16} />
                </button>
                <button
                    onClick={handleReset}
                    title="রিসেট"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                >
                    <RefreshCw size={16} />
                </button>
            </div>

            {/* Avatar preview */}
            <div className="flex items-center justify-center py-6 shrink-0">
                <div className="relative">
                    <AvatarSvg config={config} size={160} />
                </div>
            </div>

            {/* Panel tabs */}
            <div className="shrink-0 overflow-x-auto scrollbar-none border-y border-zinc-800/60">
                <div className="flex gap-1 px-3 py-2 min-w-max">
                    {studioPanels.map((panel) => (
                        <button
                            key={panel.id}
                            onClick={() => setActivePanel(panel.id)}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors',
                                activePanel === panel.id
                                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60'
                            )}
                        >
                            {panel.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-y-auto">
                <PanelContent panel={currentPanel} config={config} onUpdate={update} />
            </div>

            {/* Save footer */}
            <div className="shrink-0 border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-sm px-4 py-4">
                <button
                    onClick={handleSave}
                    disabled={saving || saved}
                    className={cn(
                        'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-colors',
                        saved
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-60'
                    )}
                >
                    {saving && <Loader2 size={16} className="animate-spin" />}
                    {saved && <Check size={16} />}
                    {saving ? 'সেভ হচ্ছে...' : saved ? 'সেভ হয়েছে!' : 'সেভ করো'}
                </button>
            </div>
        </div>
    );
}

// ─── Panel content ────────────────────────────────────────────────────────────

function PanelContent({
    panel,
    config,
    onUpdate,
}: {
    panel: StudioPanel;
    config: Required<AvatarConfig>;
    onUpdate: (key: keyof Required<AvatarConfig>, value: string) => void;
}) {
    return (
        <div className="px-4 py-4 space-y-5 max-w-2xl mx-auto">
            {panel.rows.map((row) => {
                const cat = row.category;
                const selected = config[cat.optionKey];

                return (
                    <div key={cat.id}>
                        {row.title && (
                            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">
                                {row.title}
                            </p>
                        )}
                        {cat.colorKind ? (
                            // Color swatch grid
                            <div className="flex flex-wrap gap-2">
                                {cat.values.map((val) => {
                                    const hex = swatchHex(cat.colorKind!, val);
                                    const isSelected = selected === val;
                                    return (
                                        <button
                                            key={val}
                                            title={formatChoiceLabel(val)}
                                            onClick={() => onUpdate(cat.optionKey, val)}
                                            className={cn(
                                                'relative h-9 w-9 rounded-full border-2 transition-all',
                                                isSelected
                                                    ? 'border-violet-400 scale-110 shadow-lg shadow-violet-500/20'
                                                    : 'border-zinc-700 hover:border-zinc-500 hover:scale-105'
                                            )}
                                            style={{ backgroundColor: hex ?? '#888' }}
                                        >
                                            {isSelected && (
                                                <span className="absolute inset-0 flex items-center justify-center">
                                                    <Check
                                                        size={14}
                                                        className={
                                                            isLightColor(hex)
                                                                ? 'text-zinc-900'
                                                                : 'text-white'
                                                        }
                                                        strokeWidth={3}
                                                    />
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            // Option chip grid
                            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
                                {cat.values.map((val) => {
                                    const isSelected = selected === val;
                                    return (
                                        <button
                                            key={val}
                                            onClick={() => onUpdate(cat.optionKey, val)}
                                            className={cn(
                                                'rounded-lg border px-2 py-2 text-center text-xs font-medium transition-all',
                                                isSelected
                                                    ? 'border-violet-500/60 bg-violet-500/15 text-violet-300'
                                                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                                            )}
                                        >
                                            {formatChoiceLabel(val) || 'None'}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function isLightColor(hex?: string): boolean {
    if (!hex) return false;
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}
