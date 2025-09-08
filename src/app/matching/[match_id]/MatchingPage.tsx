"use client"
import BackgroundLayout from "@/features/layout/components/BackgroundLayout"
import { CharacterSpeech } from "@/features/characterSpeech/CharacterSpeech"
import { DebateFaceoffBoard } from "@/features/matching/components/DebateFaceoffBoard/DebateFaceoffBoard"
import { useEffect, useState } from "react"

export const MatchingPage =
  (/**{ params }: { params: { match_id: string } }*/) => {
    const [active, setActive] = useState(false)
    useEffect(() => {
      const t = setTimeout(() => setActive(true), 200)
      return () => clearTimeout(t)
    }, [])

    return (
      <BackgroundLayout className="flex flex-col justify-center">
        <DebateFaceoffBoard
          positiveUserName="あなた"
          negativeUserName="相手のユーザー名"
          themeName="教育"
          topic="小学校からのプログラミング教育は必要か"
          isActive={active}
        />
        <CharacterSpeech
          videoSrc="/assets/videos/aristotle/he_mans_facial_express_2.mp4"
          name="アリストテレス"
          text="がんばえー"
        />
      </BackgroundLayout>
    )
  }
