import Image from 'next/image';
import Link from 'next/link';
import { EXAMS } from '@/config/exams';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuickStart() {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 px-4 py-3">
                <h2 className="text-sm font-semibold text-zinc-100">দ্রুত শুরু করো</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 lg:grid-cols-5">
                {EXAMS.map((exam) => (
                    <Link
                        key={exam.id}
                        href={`/quiz?exam=${exam.id}`}
                        className={cn(
                            'flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors hover:bg-zinc-800',
                            exam.borderClass
                        )}
                    >
                        <Image src={exam.iconSrc} alt={exam.name} width={24} height={24} className="object-contain" />
                        <span className={cn('text-xs font-semibold', exam.textClass)}>{exam.name}</span>
                    </Link>
                ))}
            </div>
            <div className="border-t border-zinc-800 px-4 py-3">
                <Link
                    href="/quiz"
                    className="flex items-center justify-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                    সব কুইজ দেখো
                    <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
}
