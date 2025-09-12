"use client"

import { mergeClassNames } from "@/features/style/classnames"
import { DebatePhaseTimer } from "@/features/matching/components/DebatePhaseTimer/DebatePhaseTimer"
import { DebateArgumentCard } from "@/features/matching/components/DebateArgumentCard/DebateArgumentCard"
import { MicController } from "@/features/voice/components/MicController/MicController"
import Image from "next/image"
import { useCallback } from "react"

type Side = "positive" | "negative"
type Role = "questioner" | "answerer" | "observer"
type Phase =
  | "questionWait"
  | "questioning"
  | "questionEnd"
  | "answerWait"
  | "answering"
  | "answerEnd"

type PoiBattleScreenProps = {
  side: Side // 肯定側か否定側か
  role: Role // どっちが発動したか（質問した側か回答する側か）
  phase: Phase // 何のターンか
  question?: string // 質問内容
  answer?: string // 回答内容
  timerSeconds: number // タイマーの秒数
  className?: string
}

export const PoiBattleScreen: React.FC<PoiBattleScreenProps> = ({
  side,
  role,
  phase,
  question,
  answer,
  timerSeconds,
  className,
}) => {
  // マイク状態の決定
  const getMicState = (role: Role): "idle" | "recording" | "disabled" => {
    if (role === "questioner") {
      // 質問側のマイク状態
      switch (phase) {
        case "questionWait":
          return "idle"
        case "questioning":
          return "recording"
        default:
          return "disabled"
      }
    } else if (role === "answerer") {
      // 回答側のマイク状態
      switch (phase) {
        case "answerWait":
          return "idle"
        case "answering":
          return "recording"
        default:
          return "disabled"
      }
    } else {
      return "disabled"
    }
  }

  // フクロウのガイダンスメッセージ
  const getOwlMessage = () => {
    // turnに基づいて判定
    if (role === "questioner") {
      return {
        main: "鋭い質問をブチかますホ!",
        sub: "相手に泡吹かせてやるホー!",
        tips: ["- 自信を持つべし", "- ゲームなので間違っても大丈夫である!"],
      }
    } else if (role === "answerer") {
      return {
        main: "相手の質問にまっすぐ答えるホー!",
        sub: "",
        tips: ["- 自信を持つべし", "- ゲームなので間違っても大丈夫である!"],
      }
    } else {
      return {
        main: "",
        sub: "",
        tips: [],
      }
    }
  }

  // フェーズタイトル
  const getPhaseTitle = useCallback(() => {
    // どっちが発動したか
    // もし肯定側がPOIを発動したなら"questionEnd"のturnまではタイトルは「肯定側　質問」
    // "questionEnd"以降のturnはタイトルは「否定側　回答」
    // もし否定側がPOIを発動したなら"answerEnd"のturnまではタイトルは「否定側　質問」
    // "answerEnd"以降のturnはタイトルは「肯定側　回答」

    if (
      (side === "positive" && role === "questioner") ||
      (side === "negative" && role === "answerer")
    ) {
      // 肯定側がPOIを発動した場合
      if (
        phase === "questionWait" ||
        phase === "questioning" ||
        phase === "questionEnd"
      ) {
        return "肯定側 質問"
      } else {
        return "否定側 回答"
      }
    } else if (
      (side === "negative" && role === "questioner") ||
      (side === "positive" && role === "answerer")
    ) {
      // 否定側がPOIを発動した場合
      if (
        phase === "questionWait" ||
        phase === "questioning" ||
        phase === "questionEnd"
      ) {
        return "否定側 質問"
      } else {
        return "肯定側 回答"
      }
    } else {
      return ""
    }
  }, [phase, side, role])

  // タイマーのタイトルの色
  const getTitleColor = () => {
    const title = getPhaseTitle()
    if (title.includes("否定")) {
      return "text-[#117628]" // 緑色
    } else if (title.includes("肯定")) {
      return "text-[#3F69A7]" // 青色
    } else {
      return "text-white" // デフォルト
    }
  }

  const anotherSide = side === "positive" ? "negative" : "positive"
  const owlMessage = getOwlMessage()
  const questionerMicState = getMicState("questioner")
  const answererMicState = getMicState("answerer")

  return (
    <div
      className={mergeClassNames(
        "flex h-full w-full flex-col bg-black text-white",
        className,
      )}
    >
      {/* フェーズタイトルとタイマー */}
      <div className="flex flex-col items-center justify-center gap-8x py-16x">
        <DebatePhaseTimer
          title={getPhaseTitle()}
          seconds={timerSeconds}
          isActive={true}
          titleColorClassName={getTitleColor()}
        />
      </div>

      {/* フクロウのガイダンス */}
      <div className="px-16x py-12x">
        <div className="flex items-start gap-12x">
          <Image
            src="/assets/images/owl/owl_look.png"
            alt="owl"
            width={40}
            height={40}
            className="mt-4x size-40x"
          />
          <div className="flex flex-col gap-4x">
            <div className="text-16x font-bold">{owlMessage.main}</div>
            {owlMessage.sub && (
              <div className="text-16x font-bold">{owlMessage.sub}</div>
            )}
            <ul className="space-y-2x text-14x">
              {owlMessage.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 質問・回答コンテンツ */}
      <div className="flex-1 px-16x">
        {question && (
          <DebateArgumentCard
            title="質問"
            side={role === "questioner" ? side : anotherSide}
            fullText={question}
            className="mb-12x"
          />
        )}
        {answer && (
          <DebateArgumentCard
            title="回答"
            side={role === "questioner" ? anotherSide : side}
            fullText={answer}
            className="mb-12x"
          />
        )}
      </div>

      {/* マイクボタン */}
      <div className="flex justify-center px-16x pb-24x">
        <MicController
          state={role === "questioner" ? questionerMicState : answererMicState}
          //   onTap={() => {}}
        />
      </div>
    </div>
  )
}
