'use client';

import { useEffect, useState } from 'react';
import type { AvatarConfig } from '@/types/api';
import {
    defaultAvatarConfig,
    hairColorHex,
    skinColorHex,
    fabricColorHex,
    canvasBackgroundHex,
    effectiveHair,
} from './avatar-data';

// ─── SVG path constants (mirrors mobile AvataaarSvgAssembler) ─────────────────

const PATH3 =
    'M124,144.610951 L124,163 L128,163 L128,163 C167.764502,163 200,195.235498 200,235 L200,244 L0,244 L0,235 C-4.86974701e-15,195.235498 32.235498,163 72,163 L72,163 L76,163 L76,144.610951 C58.7626345,136.422372 46.3722246,119.687011 44.3051388,99.8812385 C38.4803105,99.0577866 34,94.0521096 34,88 L34,74 C34,68.0540074 38.3245733,63.1180731 44,62.1659169 L44,56 L44,56 C44,25.072054 69.072054,5.68137151e-15 100,0 L100,0 L100,0 C130.927946,-5.68137151e-15 156,25.072054 156,56 L156,62.1659169 C161.675427,63.1180731 166,68.0540074 166,74 L166,88 C166,94.0521096 161.51969,99.0577866 155.694861,99.8812385 C153.627775,119.687011 141.237365,136.422372 124,144.610951 Z';

const NECK_SHADOW =
    'M156,79 L156,102 C156,132.927946 130.927946,158 100,158 C69.072054,158 44,132.927946 44,102 L44,79 L44,94 C44,124.927946 69.072054,150 100,150 C130.927946,150 156,124.927946 156,94 L156,79 Z';

// ─── Fragment fetching ────────────────────────────────────────────────────────

function fragmentFolder(name: string): string {
    if (name.startsWith('Mouth_')) return 'mouths';
    if (name.startsWith('Eyes_')) return 'eyes';
    if (name.startsWith('Eyebrow_')) return 'eyebrows';
    if (name.startsWith('Nose_')) return 'nose';
    if (name.startsWith('FacialHair_')) return 'facial_hair';
    if (name.startsWith('Accessories_')) return 'accessories';
    if (name.startsWith('Graphic_')) return 'graphics';
    if (name === 'Headwear_Blank') return 'headwear';
    const headwearNames = new Set(['Hat', 'Hijab', 'Turban', 'WinterHat1', 'WinterHat2', 'WinterHat3', 'WinterHat4', 'Eyepatch']);
    if (headwearNames.has(name)) return 'headwear';
    const clothesNames = new Set(['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck']);
    if (clothesNames.has(name)) return 'clothes';
    return 'hairs';
}

const fragmentCache = new Map<string, string>();

async function fetchFragment(name: string): Promise<string> {
    const folder = fragmentFolder(name);
    const path = `/avatars/${folder}/${name}.fragment.svg`;
    if (fragmentCache.has(path)) return fragmentCache.get(path)!;
    const res = await fetch(path);
    if (!res.ok) return '';
    const text = await res.text();
    fragmentCache.set(path, text);
    return text;
}

// ─── SVG assembler ────────────────────────────────────────────────────────────

async function assembleAvatar(cfg: Required<AvatarConfig>): Promise<string> {
    const skinHex = skinColorHex[cfg.skinColor] ?? '#EDB98A';
    const hairHex = hairColorHex[cfg.hairColor] ?? '#4A312C';
    const fabricHex = fabricColorHex[cfg.clotheColor] ?? '#B1E2FF';
    const hatHex = fabricColorHex[cfg.hatColor] ?? '#E6E6E6';
    const beardHex = hairColorHex[cfg.facialHairColor] ?? hairHex;
    const glassesHex = fabricColorHex[cfg.glassesColor] ?? '#3C4F5C';

    const effHair = effectiveHair(cfg);

    // Clothe
    let clothe = await fetchFragment(cfg.clotheType);
    clothe = clothe.replaceAll('__FABRIC_FILL__', fabricHex);
    if (cfg.clotheType === 'GraphicShirt' && clothe.includes('<!--GRAPHIC-->')) {
        let graphic = await fetchFragment(`Graphic_${cfg.graphicType}`);
        graphic = graphic.replaceAll('__GRAPHIC_MASK__', 'GraphicShirt_mask1');
        clothe = clothe.replaceAll('<!--GRAPHIC-->', graphic);
    }

    // Face features
    const mouth = await fetchFragment(`Mouth_${cfg.mouthType}`);
    const nose = await fetchFragment('Nose_Default');
    const eyes = await fetchFragment(`Eyes_${cfg.eyeType}`);
    const brow = await fetchFragment(`Eyebrow_${cfg.eyebrowType}`);
    const face = `<g id="Face" transform="translate(76.000000, 82.000000)" fill="#000000">${mouth}${nose}${eyes}${brow}</g>`;

    // Hair stack (with facial hair + accessories injected)
    let hairStack = await fetchFragment(effHair);
    hairStack = hairStack.replaceAll('__HAIR_FILL__', hairHex);
    let facial = await fetchFragment(`FacialHair_${cfg.facialHairType}`);
    facial = facial.replaceAll('__BEARD_FILL__', beardHex).replaceAll('__FABRIC_FILL__', beardHex);
    hairStack = hairStack.replaceAll('<!--FACIAL_HAIR-->', facial);
    let acc = await fetchFragment(`Accessories_${cfg.accessoriesType}`);
    acc = acc.replaceAll('__GLASSES_FILL__', glassesHex);
    hairStack = hairStack.replaceAll('<!--ACCESSORIES-->', acc);

    // Headwear
    const hwName = cfg.headwearType === 'Blank' ? 'Headwear_Blank' : cfg.headwearType;
    let headwear = await fetchFragment(hwName);
    headwear = headwear.replaceAll('__HAT_FILL__', hatHex);

    const bgHex = canvasBackgroundHex[cfg.backgroundColor] ?? '#F8FAFC';

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 264 280" version="1.1">
<rect width="264" height="280" rx="140" fill="${bgHex}"/>
<g id="Avataaar-root" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
<g id="Mask"/>
<g id="Avataaar-inner" stroke-width="1" fill-rule="evenodd">
<g id="Body" transform="translate(32.000000, 36.000000)">
  <defs><path id="av_path3" d="${PATH3}"/></defs>
  <mask id="av_mask3" fill="white"><use href="#av_path3"/></mask>
  <use fill="#D0C6AC" href="#av_path3"/>
  <g mask="url(#av_mask3)" fill="${skinHex}">
    <rect x="0" y="0" width="264" height="280"/>
  </g>
  <path d="${NECK_SHADOW}" fill-opacity="0.1" fill="#000000" mask="url(#av_mask3)"/>
</g>
${clothe}
${face}
${hairStack}
${headwear}
</g>
</g>
</svg>`;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface AvatarSvgProps {
    config?: AvatarConfig | null;
    size?: number;
    className?: string;
}

export function AvatarSvg({ config, size = 120, className }: AvatarSvgProps) {
    const merged: Required<AvatarConfig> = { ...defaultAvatarConfig, ...config };
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        assembleAvatar(merged).then((svg) => {
            if (!cancelled) setSvgContent(svg);
        });
        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(merged)]);

    if (!svgContent) {
        return (
            <div
                style={{ width: size, height: size }}
                className={`rounded-full bg-zinc-800 animate-pulse ${className ?? ''}`}
            />
        );
    }

    return (
        <div
            style={{ width: size, height: size }}
            className={`overflow-hidden rounded-full ${className ?? ''}`}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
}
