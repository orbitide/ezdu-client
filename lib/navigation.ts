import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

let _router: AppRouterInstance | null = null;

export function setRouter(r: AppRouterInstance) {
    _router = r;
}

export function navigateTo(path: string) {
    if (_router) {
        _router.push(path);
    } else {
        window.location.href = path;
    }
}
