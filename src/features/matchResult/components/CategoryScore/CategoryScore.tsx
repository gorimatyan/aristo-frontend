import type { ComponentPropsWithRef } from "react"
import { forte } from "../../../../../styles/fonts"
import { mergeClassNames } from "@/features/style/classnames"

type CategoryScoreProps = ComponentPropsWithRef<"div"> & {
  yourScore: number
  yourUserName: string
  opponentScore: number
  opponentUserName: string
  category: Category
}

type Category = "pointOfInformation" | "logos" | "pathos" | "ethos"

const categoryNameJp: Record<Category, string> = {
  pointOfInformation: "ポイントオブインフォメーション",
  logos: "ロゴス",
  pathos: "パトス",
  ethos: "エトス",
}

const pointOfView: Record<Category, string[]> = {
  pointOfInformation: [
    "質問の焦点・関連性",
    "回答の直答性・十分さ",
    "応答時間",
  ],
  logos: ["主張と構造の明確さ", "根拠の質と推論の妥当性", "反駁の命中精度"],
  pathos: ["明瞭さ・流暢さ", "具体性・分かりやすさ"],
  ethos: ["礼節・公平性", "ルール遵守"],
}

const categoryColor: Record<Category, string> = {
  pointOfInformation: "text-[#E0E029]",
  logos: "text-[#FF4747]",
  pathos: "text-[#56E376]",
  ethos: "text-[#84B7FF]",
}

export const CategoryScore = ({
  yourScore,
  yourUserName,
  opponentScore,
  opponentUserName,
  category,
  className,
  ...props
}: CategoryScoreProps) => {
  const categoryNameEn = () => {
    if (category === "pointOfInformation") {
      return (
        <>
          <span
            className={`${forte.className} text-40x leading-[1.1] ${categoryColor[category]}`}
          >
            Point
          </span>
          <span
            className={`${forte.className} text-40x leading-[1.1] ${categoryColor[category]}`}
          >
            Of
          </span>
          <span
            className={`${forte.className} text-40x leading-[1.1] ${categoryColor[category]}`}
          >
            Information
          </span>
        </>
      )
    } else if (category === "logos") {
      return (
        <span
          className={`${forte.className} ${categoryColor[category]} text-72x leading-[1.1]`}
        >
          Logos
        </span>
      )
    } else if (category === "pathos") {
      return (
        <span
          className={`${forte.className} ${categoryColor[category]} text-72x leading-[1.1]`}
        >
          Pathos
        </span>
      )
    } else if (category === "ethos") {
      return (
        <span
          className={`${forte.className} ${categoryColor[category]} text-72x leading-[1.1]`}
        >
          Ethos
        </span>
      )
    }
  }
  return (
    <div
      className={mergeClassNames(
        "flex h-full flex-col items-center justify-center py-16x text-white",
        className,
      )}
      {...props}
    >
      <div
        className={`pb-6x text-14x font-bold tracking-wider ${categoryColor[category]}`}
      >
        {categoryNameJp[category]}
      </div>
      <div
        className={`${forte.className} flex flex-col items-center justify-center pb-24x`}
      >
        {categoryNameEn()}
      </div>
      <div className="flex items-start gap-32x">
        <div className="flex flex-col items-center justify-center gap-20x">
          <span
            className={`${forte.className} text-60x ${categoryColor[category]}`}
          >
            {yourScore}
          </span>
          <span>{yourUserName}</span>
        </div>
        <p className="mt-18x flex min-w-120x flex-col items-center justify-center gap-1x text-12x">
          {pointOfView[category].map((point) => (
            <span key={point}>{point}</span>
          ))}
        </p>
        <div className="flex flex-col items-center justify-center gap-20x">
          <span
            className={`${forte.className} text-60x ${categoryColor[category]}`}
          >
            {opponentScore}
          </span>
          <span>{opponentUserName}</span>
        </div>
      </div>
    </div>
  )
}
