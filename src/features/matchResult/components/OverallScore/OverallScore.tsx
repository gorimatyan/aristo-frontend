import type { ComponentPropsWithRef } from "react"
import { forte } from "../../../../../styles/fonts"
import { mergeClassNames } from "@/features/style/classnames"
import { useEffect, useState } from "react"
import { WinOrLoseJudge } from "../WinOrLoseJudge/WinOrLoseJudge"

type OverallScoreProps = ComponentPropsWithRef<"div"> & {
  yourScore: number
  yourUserName: string
  opponentScore: number
  opponentUserName: string
  yourSide: "positive" | "negative"
}

export const OverallScore = ({
  yourScore,
  yourUserName,
  yourSide,
  opponentScore,
  opponentUserName,
  className,
  ...props
}: OverallScoreProps) => {
  const yourSideName = yourSide === "positive" ? "肯定" : "否定"
  const opponentSideName = yourSide === "positive" ? "否定" : "肯定"
  const yourSideColor =
    yourSide === "positive" ? "text-[#84B7FF]" : "text-[#39C058]"
  const opponentSideColor =
    yourSide === "positive" ? "text-[#39C058]" : "text-[#84B7FF]"

  const [showFirst, setShowFirst] = useState(false)
  const [showOpponentScore, setShowOpponentScore] = useState(false)
  const [showYourScore, setShowYourScore] = useState(false)
  const [showWinOrLoseJudge, setShowWinOrLoseJudge] = useState(false)

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

    // ④少し間を入れてから勝敗判定をフェードイン
    const timer4 = setTimeout(() => setShowWinOrLoseJudge(true), 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

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
          `flex flex-col items-center justify-center pb-24x text-32x font-bold`,
          transitionCls,
          showFirst ? fadeShow : fadeBase,
        )}
      >
        最終スコア
      </div>
      {/* スコア部分 */}
      <div className="flex items-end gap-8x">
        <div className="flex flex-col items-center justify-center">
          <span
            className={mergeClassNames(
              "text-16x",
              transitionCls,
              showFirst ? fadeShow : fadeBase,
            )}
          >
            {yourUserName}
          </span>
          <span className={`text-24x font-bold ${yourSideColor}`}>
            {yourSideName}
          </span>
          <p className="relative">
            <span
              className={mergeClassNames(
                `${forte.className} mt-16x text-82x ${yourSideColor}`,
                transitionCls,
                showYourScore ? fadeShow : fadeBase,
              )}
            >
              {yourScore}
            </span>
            <span
              className={mergeClassNames(
                `${forte.className} absolute left-0 top-0 animate-ping text-82x ${yourSideColor}`,
                transitionCls,
                showYourScore ? fadeShow : fadeBase,
              )}
            >
              {yourScore}
            </span>
          </p>
        </div>
        <p
          className={mergeClassNames(
            "mb-38x flex min-w-120x flex-col items-center justify-center gap-1x text-24x font-bold",
            transitionCls,
            showFirst ? fadeShow : fadeBase,
          )}
        >
          ー
        </p>
        <div className="flex flex-col items-center justify-center">
          <span
            className={mergeClassNames(
              "text-16x",
              transitionCls,
              showFirst ? fadeShow : fadeBase,
            )}
          >
            {opponentUserName}
          </span>
          <span className={`text-24x font-bold ${opponentSideColor}`}>
            {opponentSideName}
          </span>
          <p className="relative">
            <span
              className={mergeClassNames(
                `${forte.className} mt-16x text-82x ${opponentSideColor}`,
                transitionCls,
                showOpponentScore ? fadeShow : fadeBase,
              )}
            >
              {opponentScore}
            </span>
            <span
              className={mergeClassNames(
                `${forte.className} absolute left-0 top-0 text-82x ${opponentSideColor}`,
                transitionCls,
                showOpponentScore ? fadeShow : fadeBase,
              )}
            >
              {opponentScore}
            </span>
          </p>
        </div>
      </div>
      <WinOrLoseJudge
        className={mergeClassNames(
          "-mt-32x mb-64x",
          transitionCls,
          showWinOrLoseJudge ? fadeShow : fadeBase,
        )}
        judge="win"
      />
    </div>
  )
}
