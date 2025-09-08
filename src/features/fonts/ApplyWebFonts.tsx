"use client"
import { Noto_Sans_JP } from "next/font/google"
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
})

/**
 * 共通フォントを読み込むためのスタイル要素
 */
export const ApplyWebFonts = () => {
  return (
    <style jsx global>{`
      * {
        font-family: ${notoSansJp.style.fontFamily}, sans-serif;
      }

      // Override preflight by Tailwind CSS
      button,
      input,
      optgroup,
      select,
      textarea {
        font-family: ${notoSansJp.style.fontFamily}, sans-serif !important;
      }
    `}</style>
  )
}
