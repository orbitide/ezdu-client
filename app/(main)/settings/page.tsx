import { Bell, Moon, Globe, LogOut, ChevronRight, Shield, HelpCircle } from 'lucide-react';

const SETTINGS_SECTIONS = [
    {
        title: 'অ্যাকাউন্ট',
        items: [
            { icon: <Shield size={16} />, label: 'পাসওয়ার্ড পরিবর্তন' },
            { icon: <Globe size={16} />, label: 'ভাষা', value: 'বাংলা' },
        ],
    },
    {
        title: 'পছন্দ',
        items: [
            { icon: <Bell size={16} />, label: 'নোটিফিকেশন', toggle: true, on: true },
            { icon: <Moon size={16} />, label: 'ডার্ক মোড', toggle: true, on: true },
        ],
    },
    {
        title: 'সাহায্য',
        items: [
            { icon: <HelpCircle size={16} />, label: 'সাহায্য কেন্দ্র' },
        ],
    },
];

export default function SettingsPage() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <h1 className="text-lg font-bold text-zinc-100">সেটিংস</h1>

            {/* Profile tile */}
            <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 text-lg font-bold text-white">
                    তু
                </div>
                <div>
                    <p className="font-medium text-zinc-100">আপনার নাম</p>
                    <p className="text-sm text-zinc-500">user@example.com</p>
                </div>
            </div>

            {SETTINGS_SECTIONS.map((section) => (
                <div key={section.title} className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                    <div className="border-b border-zinc-800 px-4 py-2.5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{section.title}</p>
                    </div>
                    <ul className="divide-y divide-zinc-800">
                        {section.items.map((item) => (
                            <li key={item.label} className="flex items-center gap-3 px-4 py-3.5">
                                <span className="text-zinc-400">{item.icon}</span>
                                <span className="flex-1 text-sm text-zinc-100">{item.label}</span>
                                {'toggle' in item ? (
                                    <div className={`relative h-5 w-9 rounded-full transition-colors ${item.on ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                                        <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${item.on ? 'left-4' : 'left-0.5'}`} />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-zinc-500">
                                        {item.value && <span className="text-xs">{item.value}</span>}
                                        <ChevronRight size={14} />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Logout */}
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 py-3 text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors">
                <LogOut size={16} />
                লগআউট
            </button>
        </div>
    );
}
