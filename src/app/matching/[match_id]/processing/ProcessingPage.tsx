"use client"
import { MatchingLayout } from "@/features/layout/components/MatchingLayout"
import { useEffect, useState } from "react"
import { CharacterSpeech } from "@/features/characterSpeech/CharacterSpeech"
import Image from "next/image"

export const ProcessingPage =
  (/**{ params }: { params: { match_id: string } }*/) => {
    const [dots, setDots] = useState("")

    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prev) => {
          if (prev === "...") {
            return "."
          } else {
            return prev + "."
          }
        })
      }, 500) // 500ms間隔で更新

      return () => clearInterval(interval)
    }, [])

    return (
      <MatchingLayout
        className="flex flex-col justify-center"
        backgroundImageSrc="/assets/images/debate/u7544387239_A_black_and_white_photograph_of_two_men_in_suits__401b00a7-9a19-4101-b745-31536a1619e8_3.png"
        titleContent="小学校からのプログラミング教育は必要か"
      >
        {/* 討論終了の文字を表示する */}
        <div className="flex h-full flex-col items-center justify-center bg-[linear-gradient(90deg,transparent_0%,#3F3F3F_40%,#3F3F3F_60%,transparent_100%)] py-16x text-white">
          {/* 討論終了 */}
          <div className="mb-8x text-48x font-bold">討論終了</div>

          {/* 集計中... */}
          <div className="mb-16x text-24x font-bold">集計中{dots}</div>

          {/* フクロウアイコン */}
          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/owl/owl_look.png"
              alt="owl"
              width={80}
              height={80}
              className="size-80x"
            />
          </div>
        </div>

        <CharacterSpeech
          className="fixed bottom-0 left-0 right-0"
          videoSrc="/assets/videos/aristotle/he_mans_facial_express_2.mp4"
          name="アリストテレス"
          text="集計中じゃ。ちょいまちこ。"
        />
      </MatchingLayout>
    )
  }
