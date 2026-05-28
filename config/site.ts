export const SITE = {
    name: 'Ezdu',
    tagline: 'Pocket Learning Companion',
    url: 'https://ezdu.net',
    appStoreUrl: 'https://apps.apple.com/app/ezdu',
    googlePlayUrl: `https://play.google.com/store/apps/details?id=${process.env.NEXT_PUBLIC_GOOGLE_PLAY_APP_ID ?? 'app.shuvo.ezdu'}`,
} as const;
