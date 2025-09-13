import type { ComponentPropsWithRef } from "react"
import { forte } from "../../../../../styles/fonts"
import { mergeClassNames } from "@/features/style/classnames"
import { useEffect, useState } from "react"

type CategoryScoreProps = ComponentPropsWithRef<"div"> & {
  yourScore: number
  yourUserName: string
  opponentScore: number
  opponentUserName: string
  category: Category
}

type Category = "pointOfInformation" | "logos" | "pathos" | "ethos"

export const categoryNameJp: Record<Category, string> = {
  pointOfInformation: "ポイントオブインフォメーション",
  logos: "ロゴス",
  pathos: "パトス",
  ethos: "エトス",
}

// 仮実装（ここの観点についてはバックエンドから受け取る）
export const pointOfView: Record<Category, string[]> = {
  pointOfInformation: [
    "質問の焦点・関連性",
    "回答の直答性・十分さ",
    "応答時間",
  ],
  logos: ["主張と構造の明確さ", "根拠の質と推論の妥当性", "反駁の命中精度"],
  pathos: ["明瞭さ・流暢さ", "具体性・分かりやすさ"],
  ethos: ["礼節・公平性", "ルール遵守"],
}

export const categoryColor: Record<Category, string> = {
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
  const [showFirst, setShowFirst] = useState(false)
  const [showOpponentScore, setShowOpponentScore] = useState(false)
  const [showYourScore, setShowYourScore] = useState(false)

  const transitionCls = "transition-all duration-500 ease-out"
  const fadeBase = "opacity-0 translate-y-2"
  const fadeShow = "opacity-100 translate-y-0"

  useEffect(() => {
    // ①最初の要素をフェードイン
    const timer1 = setTimeout(() => setShowFirst(true), 1000)

    // ②相手のスコアをフェードイン
    const timer2 = setTimeout(() => setShowOpponentScore(true), 2000)

    // ③少し間を入れてから自分のスコアをフェードイン
    const timer3 = setTimeout(() => setShowYourScore(true), 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

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
        className={mergeClassNames(
          `pb-6x text-14x font-bold tracking-wider ${categoryColor[category]}`,
          transitionCls,
          showFirst ? fadeShow : fadeBase,
        )}
      >
        {categoryNameJp[category]}
      </div>
      <div
        className={mergeClassNames(
          `${forte.className} flex flex-col items-center justify-center pb-24x`,
          transitionCls,
          showFirst ? fadeShow : fadeBase,
        )}
      >
        {categoryNameEn()}
      </div>
      <div className="flex items-start gap-32x">
        <div className="flex flex-col items-center justify-center gap-20x">
          <span
            className={mergeClassNames(
              `${forte.className} text-60x ${categoryColor[category]}`,
              transitionCls,
              showYourScore ? fadeShow : fadeBase,
            )}
          >
            {yourScore}
          </span>
          <span
            className={mergeClassNames(
              transitionCls,
              showFirst ? fadeShow : fadeBase,
            )}
          >
            {yourUserName}
          </span>
        </div>
        <p
          className={mergeClassNames(
            "mt-18x flex min-w-120x flex-col items-center justify-center gap-1x text-12x font-bold",
            transitionCls,
            showFirst ? fadeShow : fadeBase,
          )}
        >
          {pointOfView[category].map((point) => (
            <span key={point}>{point}</span>
          ))}
        </p>
        <div className="flex flex-col items-center justify-center gap-20x">
          <span
            className={mergeClassNames(
              `${forte.className} text-60x ${categoryColor[category]}`,
              transitionCls,
              showOpponentScore ? fadeShow : fadeBase,
            )}
          >
            {opponentScore}
          </span>
          <span
            className={mergeClassNames(
              transitionCls,
              showFirst ? fadeShow : fadeBase,
            )}
          >
            {opponentUserName}
          </span>
        </div>
      </div>
    </div>
  )
}
