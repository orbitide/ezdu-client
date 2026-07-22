'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SubjectDto } from '@/types/api';

const ACCENT_PALETTE = [
    { icon: 'text-primary', bg: 'bg-primary/18', circle: 'bg-primary/15' },
    { icon: 'text-amber-400', bg: 'bg-amber-500/18', circle: 'bg-amber-500/15' },
    { icon: 'text-green-400', bg: 'bg-green-500/18', circle: 'bg-green-500/15' },
    { icon: 'text-purple-400', bg: 'bg-purple-500/18', circle: 'bg-purple-500/15' },
    { icon: 'text-rose-400', bg: 'bg-rose-500/18', circle: 'bg-rose-500/15' },
    { icon: 'text-orange-400', bg: 'bg-orange-500/18', circle: 'bg-orange-500/15' },
    { icon: 'text-cyan-400', bg: 'bg-cyan-500/18', circle: 'bg-cyan-500/15' },
    { icon: 'text-blue-400', bg: 'bg-blue-500/18', circle: 'bg-blue-500/15' },
    { icon: 'text-yellow-400', bg: 'bg-yellow-500/18', circle: 'bg-yellow-500/15' },
    { icon: 'text-violet-400', bg: 'bg-violet-500/18', circle: 'bg-violet-500/15' },
] as const;

interface ArchiveSubjectCardProps {
    subject: SubjectDto;
    index: number;
    href: string;
}

export function ArchiveSubjectCard({ subject, index, href }: ArchiveSubjectCardProps) {
    const accent = ACCENT_PALETTE[index % ACCENT_PALETTE.length];
    const hasCover = Boolean(subject.imageUrl?.trim());

    return (
        <Link
            href={href}
            className={cn(
                'group relative block aspect-[5/4] max-h-28 overflow-hidden rounded-lg border border-border bg-card',
                'transition-colors hover:border-border',
            )}
        >
            {hasCover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={subject.imageUrl}
                    alt={subject.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <>
                    <div
                        className={cn(
                            'pointer-events-none absolute -right-3 -top-3 h-14 w-14 rounded-full',
                            accent.circle,
                        )}
                    />
                    <ChevronRight
                        size={14}
                        className="absolute right-2 top-2 text-muted-foreground group-hover:text-muted-foreground"
                    />
                    <div className="relative flex h-full flex-col justify-between p-2.5">
                        <div
                            className={cn(
                                'flex h-8 w-8 items-center justify-center rounded-lg',
                                accent.bg,
                            )}
                        >
                            {subject.iconUrl?.trim() ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={subject.iconUrl}
                                    alt=""
                                    className="h-7 w-7 rounded-md object-cover"
                                />
                            ) : (
                                <BookOpen size={16} className={accent.icon} />
                            )}
                        </div>
                        <div className="space-y-0.5">
                            <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground">
                                {subject.name}
                            </p>
                            {subject.subTitle?.trim() && (
                                <p className="line-clamp-1 text-[10px] text-muted-foreground">{subject.subTitle}</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </Link>
    );
}
