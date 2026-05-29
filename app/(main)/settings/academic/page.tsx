'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { getUserConfig, saveUserConfig } from '@/lib/api/users';
import { getOnboardingClasses, getOnboardingGroups } from '@/lib/api/classes';
import type { ClassDto, GroupDto } from '@/types/api';
import { cn } from '@/lib/utils';

const SEGMENTS = [
    { value: 1, label: 'শিক্ষার্থী', description: 'SSC, HSC বা সমতুল্য' },
    { value: 2, label: 'চাকরিপ্রার্থী', description: 'BCS ও সরকারি চাকরি' },
    // { value: 3, label: 'আন্তর্জাতিক পরীক্ষা', description: 'IELTS ও ইংরেজি দক্ষতা' },
];

export default function AcademicSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [segment, setSegment] = useState<number | null>(null);
    const [classId, setClassId] = useState<number | null>(null);
    const [groupId, setGroupId] = useState<number | null>(null);

    const [classes, setClasses] = useState<ClassDto[]>([]);
    const [groups, setGroups] = useState<GroupDto[]>([]);
    const [classesLoading, setClassesLoading] = useState(false);
    const [groupsLoading, setGroupsLoading] = useState(false);

    // Load saved config on mount
    useEffect(() => {
        getUserConfig()
            .then((cfg) => {
                if (cfg) {
                    setSegment(cfg.segment ?? null);
                    setClassId(cfg.classId ?? null);
                    setGroupId(cfg.groupId ?? null);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    // Load classes filtered by segment whenever segment changes
    useEffect(() => {
        if (!segment) { setClasses([]); return; }
        setClassesLoading(true);
        getOnboardingClasses(segment)
            .then((cls) => setClasses(cls ?? []))
            .catch(() => setClasses([]))
            .finally(() => setClassesLoading(false));
    }, [segment]);

    // Load groups when classId changes
    useEffect(() => {
        if (!classId) { setGroups([]); return; }
        setGroupsLoading(true);
        getOnboardingGroups(String(classId))
            .then(setGroups)
            .catch(() => setGroups([]))
            .finally(() => setGroupsLoading(false));
    }, [classId]);

    const handleSave = async () => {
        if (!segment || !classId) {
            setError('সেগমেন্ট ও ক্লাস বেছে নাও।');
            return;
        }
        setSaving(true);
        setError(null);
        try {
            await saveUserConfig({
                segment,
                classId,
                groupId: groupId ?? undefined,
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch {
            setError('সেভ করা সম্ভব হয়নি। আবার চেষ্টা করো।');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <Link href="/settings" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-lg font-bold text-zinc-100">একাডেমিক তথ্য</h1>
            </div>

            {success && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                    <CheckCircle2 size={16} className="shrink-0" />
                    পরিবর্তন সেভ হয়েছে।
                </div>
            )}
            {error && (
                <div className="rounded-xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 size={24} className="animate-spin text-zinc-600" />
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Segment */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 px-1">সেগমেন্ট</p>
                        <div className="grid grid-cols-2 gap-2">
                            {SEGMENTS.map((s) => (
                                <button
                                    key={s.value}
                                    onClick={() => { setSegment(s.value); setClassId(null); setGroupId(null); }}
                                    className={cn(
                                        'rounded-xl border p-4 text-left transition-colors',
                                        segment === s.value
                                            ? 'border-emerald-500 bg-emerald-500/10'
                                            : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                                    )}
                                >
                                    <p className={cn('text-sm font-semibold', segment === s.value ? 'text-emerald-400' : 'text-zinc-100')}>
                                        {s.label}
                                    </p>
                                    <p className="text-xs text-zinc-500 mt-0.5">{s.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Class */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 px-1">ক্লাস</p>
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                            {classesLoading ? (
                                <div className="flex items-center justify-center py-6">
                                    <Loader2 size={18} className="animate-spin text-zinc-600" />
                                </div>
                            ) : classes.length === 0 ? (
                                <p className="py-6 text-center text-sm text-zinc-600">কোনো ক্লাস পাওয়া যায়নি</p>
                            ) : (
                                <ul className="divide-y divide-zinc-800">
                                    {classes.map((cls) => (
                                        <li key={cls.id}>
                                            <button
                                                onClick={() => { setClassId(Number(cls.id)); setGroupId(null); }}
                                                className={cn(
                                                    'w-full flex items-center justify-between px-4 py-3 text-left transition-colors',
                                                    classId === Number(cls.id)
                                                        ? 'bg-emerald-500/10 text-emerald-400'
                                                        : 'text-zinc-300 hover:bg-zinc-800/50'
                                                )}
                                            >
                                                <span className="text-sm font-medium">{cls.displayName || cls.name}</span>
                                                {classId === Number(cls.id) && (
                                                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Group — only if groups exist */}
                    {(classId && (groupsLoading || groups.length > 0)) && (
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 px-1">গ্রুপ</p>
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                                {groupsLoading ? (
                                    <div className="flex items-center justify-center py-6">
                                        <Loader2 size={18} className="animate-spin text-zinc-600" />
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-zinc-800">
                                        {groups.map((grp) => (
                                            <li key={grp.id}>
                                                <button
                                                    onClick={() => setGroupId(Number(grp.id))}
                                                    className={cn(
                                                        'w-full flex items-center justify-between px-4 py-3 text-left transition-colors',
                                                        groupId === Number(grp.id)
                                                            ? 'bg-emerald-500/10 text-emerald-400'
                                                            : 'text-zinc-300 hover:bg-zinc-800/50'
                                                    )}
                                                >
                                                    <span className="text-sm font-medium">{grp.displayName || grp.name}</span>
                                                    {groupId === Number(grp.id) && (
                                                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                                                    )}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleSave}
                        disabled={saving || !segment || !classId}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50"
                    >
                        {saving && <Loader2 size={16} className="animate-spin" />}
                        {saving ? 'সেভ হচ্ছে...' : 'সেভ করো'}
                    </button>
                </div>
            )}
        </div>
    );
}
