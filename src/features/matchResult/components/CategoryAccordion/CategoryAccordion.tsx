import type { ComponentPropsWithRef } from "react"
import { forte } from "../../../../../styles/fonts"
import { mergeClassNames } from "@/features/style/classnames"
import { useState } from "react"
import { TriangleIcon } from "@/features/icons/components/TriangleIcon"
import { pointOfView } from "../CategoryScore/CategoryScore"

type CategoryAccordionProps = ComponentPropsWithRef<"div"> & {
  category: Category
  yourScore: number
  opponentScore: number
  isOpen?: boolean
  defaultOpen?: boolean
  onToggle?: (open: boolean) => void
  className?: string
}

type Category = "pointOfInformation" | "logos" | "pathos" | "ethos"

const categoryNameJp: Record<Category, string> = {
  pointOfInformation: "ポイントオブインフォメーション",
  logos: "ロゴス",
  pathos: "パトス",
  ethos: "エトス",
}

const categoryColor: Record<Category, string> = {
  pointOfInformation: "text-[#E0E029]",
  logos: "text-[#FF4747]",
  pathos: "text-[#56E376]",
  ethos: "text-[#84B7FF]",
}

export const CategoryAccordion = ({
  category,
  yourScore,
  opponentScore,
  isOpen,
  defaultOpen = false,
  onToggle,
  className,
  ...props
}: CategoryAccordionProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)

  const open = isOpen ?? internalOpen

  const toggle = () => {
    const next = !open
    if (onToggle) onToggle(next)
    if (isOpen === undefined) setInternalOpen(next)
  }

  const categoryNameEn = () => {
    if (category === "pointOfInformation") {
      return (
        <>
          <span
            className={`${forte.className} text-20x leading-[1.1] ${categoryColor[category]}`}
          >
            Point
          </span>
          <span
            className={`${forte.className} text-20x leading-[1.1] ${categoryColor[category]}`}
          >
            Of
          </span>
          <span
            className={`${forte.className} text-20x leading-[1.1] ${categoryColor[category]}`}
          >
            Information
          </span>
        </>
      )
    } else if (category === "logos") {
      return (
        <span
          className={`${forte.className} ${categoryColor[category]} text-32x leading-[1.1]`}
        >
          Logos
        </span>
      )
    } else if (category === "pathos") {
      return (
        <span
          className={`${forte.className} ${categoryColor[category]} text-32x leading-[1.1]`}
        >
          Pathos
        </span>
      )
    } else if (category === "ethos") {
      return (
        <span
          className={`${forte.className} ${categoryColor[category]} text-32x leading-[1.1]`}
        >
          Ethos
        </span>
      )
    }
  }

  return (
    <div className={mergeClassNames("w-full text-white", className)} {...props}>
      {/* ヘッダー部分（クリック可能） */}
      <button
        type="button"
        aria-expanded={open}
        onClick={toggle}
        className="flex w-full flex-col items-center justify-center py-16x"
      >
        {/* カテゴリ名（日本語） */}
        <div
          className={`pb-6x text-14x font-bold tracking-wider ${categoryColor[category]}`}
        >
          {categoryNameJp[category]}
        </div>

        {/* スコア表示 */}
        <div className="flex items-center justify-center gap-32x">
          <span
            className={`${forte.className} text-40x ${categoryColor[category]}`}
          >
            {yourScore}
          </span>
          {/* カテゴリ名（英語） */}
          <div
            className={`${forte.className} flex min-w-120x flex-col items-center justify-center`}
          >
            {categoryNameEn()}
          </div>
          <span
            className={`${forte.className} text-40x leading-[1.1] ${categoryColor[category]}`}
          >
            {opponentScore}
          </span>
        </div>

        {/* 三角形インジケーター */}
        <div className="relative w-full">
          <div className="absolute left-1/2 -translate-x-1/2">
            <TriangleIcon
              className={mergeClassNames(
                "transition-transform duration-300 ease-out will-change-transform",
                open ? "rotate-0" : "-rotate-180",
              )}
            />
          </div>
        </div>
      </button>

      {/* アコーディオン部分 */}
      <div
        className={mergeClassNames(
          "flex w-full flex-col items-center overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="pb-16x">
          <div className="mt-18x flex min-w-120x flex-col items-center justify-center gap-16x text-16x font-bold">
            {pointOfView[category].map((point) => (
              <p
                key={point}
                className="flex items-center justify-center gap-16x"
              >
                <span>12</span>
                <span className="min-w-180x text-center">{point}</span>
                <span>20</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
