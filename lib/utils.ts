import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Bengali numerals ─────────────────────────────────────────────────────────
// Ported from ezdu-mobile `core/utils/extensions.dart` (BanglaNumbers/BanglaTime).
// Pure digit substitution — every non-digit character passes through untouched.

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBangla(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return '';
    return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

export const bnDin = (n: number) => `${toBangla(n)}দিন`;
export const bnGhonta = (n: number) => `${toBangla(n)}ঘণ্টা`;
export const bnMinute = (n: number) => `${toBangla(n)}মিনিট`;
export const bnSecond = (n: number) => `${toBangla(n)}সেকেন্ড`;
export const bnMas = (n: number) => `${toBangla(n)}মাস`;
