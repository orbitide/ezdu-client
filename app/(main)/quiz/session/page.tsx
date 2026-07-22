'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { QuizEngine } from '@/features/quiz/engine/QuizEngine';
import { CongratulationResult, PresetResult } from '@/features/quiz/engine/resultBuilders';
import { useEngineStore } from '@/features/quiz/engine/engine.store';
import { useLaunchStore } from '@/features/quiz/engine/launch.store';

/**
 * Host route for any quiz staged via `useLaunchStore` — the mock-test builder
 * and the preset sheet both land here. Which result screen renders is decided
 * by the config, mirroring mobile's `buildCongratulationResult` vs
 * `buildPresetResult` split.
 */
export default function MockTestSessionPage() {
    const router = useRouter();
    const { config, questions, returnTo, clear } = useLaunchStore();
    const reset = useEngineStore((s) => s.reset);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!config || questions.length === 0) router.replace('/mock-tests');
    }, [config, questions.length, router]);

    if (!config || questions.length === 0) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-teal-400" />
            </div>
        );
    }

    const goHome = () => { reset(); clear(); router.push(returnTo); };

    // Preset quizzes are the ones mobile renders with `buildPresetResult`:
    // all-in-list layout with negative marking.
    const isPreset = config.layout === 'allInList';

    return (
        <QuizEngine
            key={attempt}
            config={config}
            questions={questions}
            onExit={goHome}
        >
            {(outcome) =>
                isPreset ? (
                    <PresetResult outcome={outcome} onHome={goHome} />
                ) : (
                    <CongratulationResult
                        outcome={outcome}
                        onRetry={() => { reset(); setAttempt((a) => a + 1); }}
                        onHome={goHome}
                    />
                )
            }
        </QuizEngine>
    );
}
