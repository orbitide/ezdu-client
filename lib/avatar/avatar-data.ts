import type { AvatarConfig } from "@/lib/types/user"

export const defaultAvatarConfig: AvatarConfig = {
  hairType: "LongHairMiaWallace",
  hairColor: "BrownDark",
  headwearType: "Blank",
  hatColor: "Gray01",
  accessoriesType: "Blank",
  glassesColor: "Heather",
  facialHairType: "Blank",
  facialHairColor: "BrownDark",
  clotheType: "Hoodie",
  clotheColor: "PastelBlue",
  graphicType: "Skull",
  eyeType: "Happy",
  eyebrowType: "Default",
  mouthType: "Smile",
  skinColor: "Light",
  backgroundColor: "WarmWhite",
}

// ─── Option lists ─────────────────────────────────────────────────────────────

export const hairTypes = [
  "NoHair", "LongHairBigHair", "LongHairBob", "LongHairBun", "LongHairCurly",
  "LongHairCurvy", "LongHairDreads", "LongHairFrida", "LongHairFro", "LongHairFroBand",
  "LongHairNotTooLong", "LongHairShavedSides", "LongHairMiaWallace", "LongHairStraight",
  "LongHairStraight2", "LongHairStraightStrand", "ShortHairDreads01", "ShortHairDreads02",
  "ShortHairFrizzle", "ShortHairShaggyMullet", "ShortHairShortCurly", "ShortHairShortFlat",
  "ShortHairShortRound", "ShortHairShortWaved", "ShortHairSides", "ShortHairTheCaesar",
  "ShortHairTheCaesarSidePart",
]

export const headwearTypes = [
  "Blank", "Hat", "Hijab", "Turban",
  "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4", "Eyepatch",
]

export const accessoriesTypes = [
  "Blank", "Kurt", "Prescription01", "Prescription02", "Round", "Sunglasses", "Wayfarers",
]

export const hairColors = [
  "Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark",
  "PastelPink", "Blue", "Platinum", "Red", "SilverGray",
]

export const facialHairTypes = [
  "Blank", "BeardMedium", "BeardLight", "BeardMajestic", "MoustacheFancy", "MoustacheMagnum",
]

export const facialHairColors = [
  "Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark",
  "Platinum", "Red", "SilverGray",
]

export const clotheTypes = [
  "BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt",
  "Hoodie", "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck",
]

export const graphicTypes = [
  "Bat", "Cumbia", "Deer", "Diamond", "Hola", "Pizza", "Resist", "Selena",
  "Bear", "SkullOutline", "Skull",
]

export const eyeTypes = [
  "Close", "Cry", "Default", "Dizzy", "EyeRoll", "Happy", "Hearts",
  "Side", "Squint", "Surprised", "Wink", "WinkWacky",
]

export const eyebrowTypes = [
  "Angry", "AngryNatural", "Default", "DefaultNatural", "FlatNatural",
  "RaisedExcited", "RaisedExcitedNatural", "SadConcerned", "SadConcernedNatural",
  "UnibrowNatural", "UpDown", "UpDownNatural",
]

export const mouthTypes = [
  "Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad",
  "ScreamOpen", "Serious", "Smile", "Tongue", "Twinkle", "Vomit",
]

export const skinColors = ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"]

export const fabricPalette = [
  "Black", "Blue01", "Blue02", "Blue03", "Gray01", "Gray02", "Heather",
  "PastelBlue", "PastelGreen", "PastelOrange", "PastelRed", "PastelYellow",
  "Pink", "Red", "White",
]

export const canvasBackgrounds = ["SkyBlue", "SoftMint", "Lavender", "WarmWhite", "Peach", "Slate", "Blush", "Charcoal"]

// ─── Color hex maps ───────────────────────────────────────────────────────────

export const hairColorHex: Record<string, string> = {
  Auburn: "#A55728", Black: "#2C1B18", Blonde: "#B58143", BlondeGolden: "#D6B370",
  Brown: "#724133", BrownDark: "#4A312C", PastelPink: "#F59797", Blue: "#000fdb",
  Platinum: "#ECDCBF", Red: "#C93305", SilverGray: "#E8E1E1",
}

export const skinColorHex: Record<string, string> = {
  Tanned: "#FD9841", Yellow: "#F8D25C", Pale: "#FFDBB4", Light: "#EDB98A",
  Brown: "#D08B5B", DarkBrown: "#AE5D29", Black: "#614335",
}

export const fabricColorHex: Record<string, string> = {
  Black: "#262E33", Blue01: "#65C9FF", Blue02: "#5199E4", Blue03: "#25557C",
  Gray01: "#E6E6E6", Gray02: "#929598", Heather: "#3C4F5C", PastelBlue: "#B1E2FF",
  PastelGreen: "#A7FFC4", PastelOrange: "#FFDEB5", PastelRed: "#FFAFB9",
  PastelYellow: "#FFFFB1", Pink: "#FF488E", Red: "#FF5C5C", White: "#FFFFFF",
}

export const canvasBackgroundHex: Record<string, string> = {
  SkyBlue: "#BAE6FD", SoftMint: "#D1FAE5", Lavender: "#E9D5FF", WarmWhite: "#F8FAFC",
  Peach: "#FFEDD5", Slate: "#E2E8F0", Blush: "#FCE7F3", Charcoal: "#1E293B",
}

// ─── Studio panels ────────────────────────────────────────────────────────────

export type ColorKind = "hair" | "skin" | "fabric" | "canvas"

export interface StudioCategory {
  id: string
  label: string
  optionKey: keyof AvatarConfig
  values: string[]
  colorKind?: ColorKind
}

export interface StudioPanelRow {
  title?: string
  category: StudioCategory
}

export interface StudioPanel {
  id: string
  label: string
  rows: StudioPanelRow[]
}

export const studioPanels: StudioPanel[] = [
  {
    id: "background", label: "ব্যাকগ্রাউন্ড",
    rows: [{ category: { id: "bg", label: "ব্যাকগ্রাউন্ড", optionKey: "backgroundColor", values: canvasBackgrounds, colorKind: "canvas" } }],
  },
  {
    id: "hair", label: "চুল",
    rows: [
      { category: { id: "hair", label: "চুলের স্টাইল", optionKey: "hairType", values: hairTypes } },
      { title: "চুলের রং", category: { id: "hairColor", label: "চুলের রং", optionKey: "hairColor", values: hairColors, colorKind: "hair" } },
    ],
  },
  {
    id: "headwear", label: "হেডওয়্যার",
    rows: [
      { category: { id: "headwear", label: "হেডওয়্যার", optionKey: "headwearType", values: headwearTypes } },
      { title: "রং", category: { id: "hatColor", label: "রং", optionKey: "hatColor", values: fabricPalette, colorKind: "fabric" } },
    ],
  },
  {
    id: "eyes", label: "চোখ",
    rows: [{ category: { id: "eyes", label: "চোখ", optionKey: "eyeType", values: eyeTypes } }],
  },
  {
    id: "brows", label: "ভ্রু",
    rows: [{ category: { id: "brows", label: "ভ্রু", optionKey: "eyebrowType", values: eyebrowTypes } }],
  },
  {
    id: "mouth", label: "মুখ",
    rows: [{ category: { id: "mouth", label: "মুখ", optionKey: "mouthType", values: mouthTypes } }],
  },
  {
    id: "skin", label: "গায়ের রং",
    rows: [{ category: { id: "skin", label: "গায়ের রং", optionKey: "skinColor", values: skinColors, colorKind: "skin" } }],
  },
  {
    id: "glasses", label: "চশমা",
    rows: [
      { category: { id: "glasses", label: "চশমা", optionKey: "accessoriesType", values: accessoriesTypes } },
      { title: "ফ্রেমের রং", category: { id: "glassesColor", label: "ফ্রেমের রং", optionKey: "glassesColor", values: fabricPalette, colorKind: "fabric" } },
    ],
  },
  {
    id: "facialHair", label: "দাড়ি",
    rows: [
      { category: { id: "facialHair", label: "দাড়ি", optionKey: "facialHairType", values: facialHairTypes } },
      { title: "দাড়ির রং", category: { id: "facialHairColor", label: "দাড়ির রং", optionKey: "facialHairColor", values: facialHairColors, colorKind: "hair" } },
    ],
  },
  {
    id: "outfit", label: "পোশাক",
    rows: [
      { category: { id: "clothes", label: "পোশাক", optionKey: "clotheType", values: clotheTypes } },
      { title: "পোশাকের রং", category: { id: "clotheColor", label: "রং", optionKey: "clotheColor", values: fabricPalette, colorKind: "fabric" } },
      { title: "গ্রাফিক", category: { id: "graphic", label: "গ্রাফিক", optionKey: "graphicType", values: graphicTypes } },
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function swatchHex(kind: ColorKind, value: string): string | undefined {
  if (kind === "hair") return hairColorHex[value]
  if (kind === "skin") return skinColorHex[value]
  if (kind === "fabric") return fabricColorHex[value]
  if (kind === "canvas") return canvasBackgroundHex[value]
}

export function formatChoiceLabel(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/(\d+)/g, " $1")
    .trim()
}

const COVERS_HAIR = new Set(["Hat", "Hijab", "Turban", "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4"])

export function effectiveHair(config: AvatarConfig): string {
  return COVERS_HAIR.has(config.headwearType) ? "NoHair" : config.hairType
}
