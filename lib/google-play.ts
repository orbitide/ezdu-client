export function googlePlayListingUrl(): string | undefined {
    const id = process.env.NEXT_PUBLIC_GOOGLE_PLAY_APP_ID?.trim();
    if (!id) return undefined;
    return `https://play.google.com/store/apps/details?id=${encodeURIComponent(id)}`;
}

export function googlePlayHref(): string {
    return googlePlayListingUrl() ?? "https://play.google.com/store";
}
