"use client"

import Image from "next/image"
import { mergeClassNames } from "@/features/style/classnames"
import { useEffect, useState } from "react"

type DebateFaceoffBoardProps = {
  positiveUserName: string
  negativeUserName: string
  themeName: string
  topic: string
  className?: string
}

export const DebateFaceoffBoard: React.FC<DebateFaceoffBoardProps> = ({
  positiveUserName,
  negativeUserName,
  themeName,
  topic,
  className,
}) => {
  const [showTitle, setShowTitle] = useState(false)
  const [showPositive, setShowPositive] = useState(false)
  const [showNegative, setShowNegative] = useState(false)

  const transitionCls = "transition-all duration-500 ease-out"
  const fadeBase = "opacity-0 translate-y-2"
  const fadeShow = "opacity-100 translate-y-0"

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShowTitle(true))
    const t1 = setTimeout(() => setShowPositive(true), 1000)
    const t2 = setTimeout(() => setShowNegative(true), 2000)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div
      className={mergeClassNames(
        "h-full pb-200x text-center text-white",
        className,
      )}
    >
      {/* テーマ名、トピック */}
      <div
        className={mergeClassNames(
          "flex flex-col items-center justify-center gap-8x pb-48x",
          transitionCls,
          showTitle ? fadeShow : fadeBase,
        )}
      >
        <Image
          src="/assets/images/theme/book.png"
          alt="theme"
          width={100}
          height={100}
          className="size-48x"
        />
        <span className="text-22x font-bold">{themeName}</span>
        <span className="text-16x font-bold leading-[1.0]">{topic}</span>
      </div>

      {/* ユーザー名、肯定、否定 */}
      <div className="flex flex-col items-center justify-center gap-24x font-bold">
        <div
          className={mergeClassNames(
            "text-center",
            transitionCls,
            showPositive ? fadeShow : fadeBase,
          )}
        >
          <div className="text-20x text-gray-400">{positiveUserName}</div>
          <div className="text-72x leading-[1.0] text-[#3F69A7]">肯定</div>
        </div>
        <div className="text-20x">VS</div>
        <div
          className={mergeClassNames(
            "text-center",
            transitionCls,
            showNegative ? fadeShow : fadeBase,
          )}
        >
          <div className="text-20x text-gray-400">{negativeUserName}</div>
          <div className="text-72x leading-[1.0] text-[#117628]">否定</div>
        </div>
      </div>
    </div>
  )
}

export default DebateFaceoffBoard
