"use client"
import BackgroundLayout from "@/features/layout/components/BackgroundLayout"
import { CharacterSpeech } from "@/features/characterSpeech/CharacterSpeech"
import { DebateFaceoffBoard } from "@/features/matching/components/DebateFaceoffBoard/DebateFaceoffBoard"

export const MatchingPage =
  (/**{ params }: { params: { match_id: string } }*/) => {
    return (
      <BackgroundLayout className="flex flex-col justify-center">
        <DebateFaceoffBoard
          positiveUserName="あなた"
          negativeUserName="相手のユーザー名"
          themeName="教育"
          topic="小学校からのプログラミング教育は必要か"
        />
        <CharacterSpeech
          videoSrc="/assets/videos/aristotle/he_mans_facial_express_2.mp4"
          name="アリストテレス"
          text="がんばえー"
        />
      </BackgroundLayout>
    )
  }
