import clsx, { type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * Tailwind CSSのカスタムテーマとして定義している各種単位を判定する関数
 */
const checkCustomSpacing = (value: string) => {
  const regex = /^\d+[a-zA-Z]+$/
  const customSpaceSuffix = ["base", "xs", "xl", "sm", "lg"]
  return regex.test(value) || customSpaceSuffix.includes(value)
}

const twMerge = extendTailwindMerge({
  extend: {
    /**
     * 競合するクラス名を正式なプロパティごとにマッピング
     *
     * NOTE：
     * twMergeの仕様として`text-2x`（fontSize）と`text-white`（color）のような
     * prefixが同一だがプロパティが異なるクラスを自動で判別できず、
     * 重複しているクラスとして上書きしてしまう。
     */
    classGroups: {
      "font-size": [
        {
          text: [checkCustomSpacing],
        },
      ],
      "border-w": [
        {
          border: [checkCustomSpacing],
        },
      ],
      "border-w-x": [
        {
          "border-x": [checkCustomSpacing],
        },
      ],
      "border-w-y": [
        {
          "border-y": [checkCustomSpacing],
        },
      ],
      "border-w-t": [
        {
          "border-t": [checkCustomSpacing],
        },
      ],
      "border-w-b": [
        {
          "border-b": [checkCustomSpacing],
        },
      ],
      "border-w-r": [
        {
          "border-r": [checkCustomSpacing],
        },
      ],
      "border-w-l": [
        {
          "border-l": [checkCustomSpacing],
        },
      ],
      gap: [
        {
          gap: [checkCustomSpacing],
        },
      ],
      "gap-x": [
        {
          "gap-x": [checkCustomSpacing],
        },
      ],
      "gap-y": [
        {
          "gap-y": [checkCustomSpacing],
        },
      ],
    },
  },
})

/**
 * Tailwind CSSのクラス名をマージする関数
 *
 * 重複しているスタイルの上書きなどを内部的に行うため、
 * classNameをpropsとして受け取るようなケースで使用
 */
export const mergeClassNames = (...values: ClassValue[]) =>
  twMerge(clsx(values))
