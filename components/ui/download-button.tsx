import { googlePlayHref } from "@/lib/google-play";
import { cn } from "@/lib/utils";

type Props = {
    type: "apple" | "google", className?: string | undefined;
}

export function DownloadButton({type, className}: Props) {
    const appStoreLink =
        process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() || "https://apps.apple.com/";
    const googlePlayLink = googlePlayHref();

    return type === "apple" ? (
        <a href={appStoreLink} target="_blank" rel="noopener noreferrer">

            <button
                type="button"
                className={cn("group flex items-center justify-center gap-3 px-6 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-700 min-w-[180px] shadow-sm active:scale-[0.98]", className)}
            >
                <svg viewBox="0 0 384 512" width="22" height="22" fill="currentColor" className="text-white">
                    <path
                        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <div className="text-left">
                    <div className="text-[10px] leading-tight font-medium text-zinc-400 mb-0.5">
                        Download on the
                    </div>
                    <div className="text-[15px] leading-tight font-semibold text-zinc-100 tracking-tight">
                        App Store
                    </div>
                </div>
            </button>
        </a>
    ) : (
        <a href={googlePlayLink} target="_blank" rel="noopener noreferrer">

            <button
                type="button"
                className={cn("group flex items-center justify-center gap-3 px-6 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-700 min-w-[180px] shadow-sm active:scale-[0.98]", className)}
            >
                <svg width="22" height="22" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                     className="brightness-110">
                    <path fill="#42a5f5"
                          d="M313.8 162.6L82.1 29.3C67.1 20.8 55.1 21.8 47.7 29.8L247.5 229L313.8 162.6z"/>
                    <path fill="#66bb6a"
                          d="M47.7 29.9c-2.3 2.4-3.5 6.1-3.5 10.6v431c0 4.5 1.2 8.2 3.5 10.6l.2.1L247.5 283v-54L47.9 29.8L47.7 29.9z"/>
                    <path fill="#ffee58"
                          d="M313.8 349.4l-66.3-66.4v0l-.1-.1l.1-.1v0l66.3-66.4l.2.1l78.7 44.8c22.5 12.8 22.5 33.7 0 46.5l-78.7 44.8l-.2.1z"/>
                    <path fill="#ef5350" d="M313.8 349.4L247.5 283L47.7 482.2c7.4 8 19.5 8.9 34.4.5L313.8 349.4z"/>
                </svg>
                <div className="text-left">
                    <div
                        className="text-[10px] leading-tight font-medium text-zinc-400 mb-0.5 uppercase tracking-wider">
                        Get it on
                    </div>
                    <div className="text-[15px] leading-tight font-semibold text-zinc-100 tracking-tight">
                        Google Play
                    </div>
                </div>
            </button>
        </a>
    );
}