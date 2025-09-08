"use client"

import Image from "next/image"
import { mergeClassNames } from "@/features/style/classnames"
import { useEffect, useState } from "react"
import { CharacterSpeech } from "@/features/characterSpeech/CharacterSpeech"

type DebateFaceoffBoardProps = {
  positiveUserName: string
  negativeUserName: string
  themeName: string
  topic: string
  isActive: boolean
  className?: string
}

export const DebateFaceoffBoard: React.FC<DebateFaceoffBoardProps> = ({
  positiveUserName,
  negativeUserName,
  themeName,
  topic,
  isActive,
  className,
}) => {
  const [showTitle, setShowTitle] = useState(false)
  const [showPositive, setShowPositive] = useState(false)
  const [showNegative, setShowNegative] = useState(false)
  const [showVS, setShowVS] = useState(false)

  const transitionCls = "transition-all duration-500 ease-out"
  const fadeBase = "opacity-0 translate-y-2"
  const fadeShow = "opacity-100 translate-y-0"

  useEffect(() => {
    let raf: number | null = null
    let t1: ReturnType<typeof setTimeout> | null = null
    let t2: ReturnType<typeof setTimeout> | null = null

    if (isActive) {
      // いったん非表示にしてから次フレームで順次表示
      setShowTitle(false)
      setShowPositive(false)
      setShowNegative(false)
      setShowVS(false)
      raf = requestAnimationFrame(() => {
        setShowTitle(true)
        t1 = setTimeout(() => {
          setShowPositive(true)
          setShowVS(true)
        }, 400)
        t2 = setTimeout(() => setShowNegative(true), 800)
      })
    } else {
      // 全てフェードアウト
      setShowNegative(false)
      setShowPositive(false)
      setShowTitle(false)
      setShowVS(false)
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (t1) clearTimeout(t1)
      if (t2) clearTimeout(t2)
    }
  }, [isActive])

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
        <div
          className={mergeClassNames(
            "text-20x",
            transitionCls,
            showVS ? "opacity-100" : "opacity-0",
          )}
        >
          VS
        </div>
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
      <CharacterSpeech
        className={mergeClassNames(
          transitionCls,
          isActive ? "opacity-100" : "opacity-0",
        )}
        videoSrc="/assets/videos/aristotle/he_mans_facial_express_2.mp4"
        name="アリストテレス"
        text="がんばえー"
      />
    </div>
  )
}
