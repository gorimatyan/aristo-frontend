import type { Config } from "tailwindcss"
import { designTokenTheme } from "./src/script"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tegaki: ["var(--font-tegaki)"],
        notoSerifJp: ["var(--font-noto-serif-jp)"],
      },
      fontSize: {
        "2xs": "clamp(10px, 2.564102564102564vw, 13px)", // 10px
        xs: "clamp(10px, 3.076923076923077svw, 15px)", // 12px
        sm: "clamp(13px, 3.58974358974359vw, 16px)", // 14px
        base: "clamp(14px, 4.102564102564103vw, 18px)", // 16px
        lg: "clamp(16px, 4.615384615384615vw, 21px)", // 18px
        ...designTokenTheme.fontSize,
      },
      spacing: {
        base: "clamp(14px, 4.102564102564103vw, 19px)",
        "2xs": "clamp(2px, 1.025641025641026vw, 6px)",
        xs: "clamp(4px, 2.051282051282051vw, 10px)",
        xl: "clamp(22px, 6.923076923076923vw, 32px)",
        ...designTokenTheme.spacing,
      },
      /**
       * NOTE：
       * ドキュメント上、spacingの値を継承するはずだが、
       * ESLintで引っかかるため別途指定
       *
       * ref: https://tailwindcss.com/docs/customizing-spacing
       */
      minWidth: {
        ...designTokenTheme.spacing,
      },
      minHeight: {
        ...designTokenTheme.spacing,
      },
      gap: {
        base: "clamp(14px, 4.102564102564103vw, 18px)",
        "2xs": "clamp(2px, 1.025641025641026vw, 6px)",
        xs: "clamp(4px, 2.051282051282051vw, 10px)",
      },
      lineHeight: designTokenTheme.lineHeight,
      letterSpacing: designTokenTheme.letterSpacing,
      borderWidth: designTokenTheme.borderWidth,
      borderRadius: designTokenTheme.borderRadius,
    },
    screens: designTokenTheme.screens,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
}

export default config
