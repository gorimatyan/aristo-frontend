/**
 * NOTE：
 * `tailwind.config.ts`内部ではエイリアスを解釈できないため
 * 相対パスでimportする
 *
 * - https://github.com/tailwindlabs/tailwindcss/issues/11097
 */
import { BREAK_POINT_SCREENS, SCREENS } from "../constants/designTokens"

import { getSpacing } from "./spacing"
import type { ThemeConfig } from "tailwindcss/types/config"
import { getScreenSizes } from "./screens"

const customSpacing = getSpacing({
  viewSizes: SCREENS,
  max: 800,
})

/**
 * Tailwind CSSのテーマ用のデザイントークン
 */
export const designTokenTheme = {
  spacing: customSpacing,
  fontSize: customSpacing,
  lineHeight: customSpacing,
  letterSpacing: customSpacing,
  borderWidth: customSpacing,
  borderRadius: customSpacing,
  screens: getScreenSizes(BREAK_POINT_SCREENS),
} as const satisfies Partial<ThemeConfig>
