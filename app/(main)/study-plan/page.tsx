import { BookOpen, CheckCircle2, Circle, Calendar, ChevronRight } from 'lucide-react';
import { EXAM_MAP } from '@/config/exams';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PLAN_ITEMS = [
    { id: 1, examId: 'ssc' as const, subject: 'গণিত', topic: 'বীজগণিত', done: true, quizId: 'q1' },
    { id: 2, examId: 'ssc' as const, subject: 'পদার্থবিজ্ঞান', topic: 'আলো', done: true, quizId: 'q2' },
    { id: 3, examId: 'bcs' as const, subject: 'বাংলা', topic: 'ব্যাকরণ', done: false, quizId: 'q3' },
    { id: 4, examId: 'bcs' as const, subject: 'সাধারণ জ্ঞান', topic: 'বাংলাদেশ', done: false, quizId: 'q4' },
    { id: 5, examId: 'ielts' as const, subject: 'Reading', topic: 'Comprehension', done: false, quizId: 'q6' },
];

const completed = PLAN_ITEMS.filter((i) => i.done).length;
const total = PLAN_ITEMS.length;
const pct = Math.round((completed / total) * 100);

export default function StudyPlanPage() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                    <BookOpen size={20} className="text-purple-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">স্টাডি প্ল্যান</h1>
                    <p className="text-xs text-zinc-500">আজকের জন্য পরিকল্পনা</p>
                </div>
            </div>

            {/* Progress overview */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-100">আজকের অগ্রগতি</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-400">{completed}/{total} সম্পন্ন</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${pct}%` }}
                    />
                </div>
                <p className="mt-1.5 text-xs text-zinc-500">{pct}% সম্পন্ন</p>
            </div>

            {/* Plan items */}
            <div className="space-y-2">
                {PLAN_ITEMS.map((item) => {
                    const exam = EXAM_MAP[item.examId];
                    return (
                        <div
                            key={item.id}
                            className={cn(
                                'flex items-center gap-3 rounded-xl border p-4 transition-colors',
                                item.done
                                    ? 'border-zinc-800 bg-zinc-900 opacity-60'
                                    : 'border-zinc-700 bg-zinc-900 hover:border-zinc-600'
                            )}
                        >
                            <span className={cn('shrink-0', item.done ? 'text-emerald-400' : 'text-zinc-600')}>
                                {item.done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                            </span>
                            <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg text-sm shrink-0', exam.bgClass)}>
                                {exam.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className={cn('text-sm font-medium truncate', item.done ? 'line-through text-zinc-500' : 'text-zinc-100')}>
                                    {item.subject}
                                </p>
                                <p className="text-xs text-zinc-500">{exam.name} · {item.topic}</p>
                            </div>
                            {!item.done && (
                                <Link
                                    href={`/quiz/${item.quizId}`}
                                    className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                                >
                                    শুরু করো
                                    <ChevronRight size={12} />
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Weekly plan note */}
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <p className="text-sm font-medium text-blue-300">📅 সাপ্তাহিক লক্ষ্য</p>
                <p className="mt-1 text-xs text-zinc-500">
                    এই সপ্তাহে ৭টি বিষয় সম্পন্ন করার লক্ষ্যমাত্রা রয়েছে। এখনও ৩টি বাকি।
                </p>
            </div>
        </div>
    );
}
