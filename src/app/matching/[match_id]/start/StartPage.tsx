"use client"
import { MatchingLayout } from "@/features/layout/components/MatchingLayout"
import { DebateArgumentCard } from "@/features/matching/components/DebateArgumentCard/DebateArgumentCard"
import { DebatePhaseTimer } from "@/features/matching/components/DebatePhaseTimer/DebatePhaseTimer"
import { MatchingBottomActions } from "@/features/matching/components/MatchingBottomActions/MatchingBottomActions"
import { PoiStartScreen } from "@/features/poi/components/PoiStartScreen/PoiStartScreen"
import { PoiBattleScreen } from "@/features/poi/components/PoiBattleScreen/PoiBattleScreen"
import { useEffect, useState } from "react"

type PoiPhase =
  | "questionWait"
  | "questioning"
  | "questionEnd"
  | "answerWait"
  | "answering"
  | "answerEnd"

export const StartPage =
  (/**{ params }: { params: { match_id: string } }*/) => {
    const [showPoiStart, setShowPoiStart] = useState(false)
    const [showPoiBattle, setShowPoiBattle] = useState(false)
    const [poiPhase, setPoiPhase] = useState<PoiPhase>("questionWait")
    const [question, setQuestion] = useState<string | undefined>(undefined)
    const [answer, setAnswer] = useState<string | undefined>(undefined)

    // POI開始画面の制御
    useEffect(() => {
      if (showPoiStart) {
        const t = setTimeout(() => {
          setShowPoiStart(false)
          setShowPoiBattle(true)
        }, 3000)
        return () => clearTimeout(t)
      }
    }, [showPoiStart])

    // POI対戦画面の状態遷移
    useEffect(() => {
      if (!showPoiBattle) return

      const transitions = [
        { phase: "questionWait" as PoiPhase, delay: 0 },
        { phase: "questioning" as PoiPhase, delay: 2000 },
        {
          phase: "questionEnd" as PoiPhase,
          delay: 5000,
          question:
            "プログラミング教育について質問があります。確かにデジタル社会においてプログラミングは重要なスキルの一つですが、それを小学生全員に必修化することには多くの問題があります。まず、教育現場の準備が不十分です。プログラミングを指導できる教師は限られており、十分な研修も整っていない状況で無理に導入すれば、形式的な授業になり、子どもにとっては単なる作業にすぎなくなる恐れがあります。",
        },
        { phase: "answerWait" as PoiPhase, delay: 7000 },
        { phase: "answering" as PoiPhase, delay: 9000 },
        {
          phase: "answerEnd" as PoiPhase,
          delay: 12000,
          answer:
            "確かに重要なスキルですが、小学校段階では基礎学力の習得が最優先です。プログラミング教育は中学以降で選択制として学べば十分であり、全員に義務付ける必要はないと考えます。また、家庭環境によるIT格差も深刻で、不平等を拡大する可能性があります。",
        },
      ]

      const timeouts: NodeJS.Timeout[] = []

      transitions.forEach(({ phase, delay, question: q, answer: a }) => {
        const timeout = setTimeout(() => {
          setPoiPhase(phase)
          if (q) setQuestion(q)
          if (a) setAnswer(a)
        }, delay)
        timeouts.push(timeout)
      })

      // 最終的にPOIを終了
      const finalTimeout = setTimeout(() => {
        setShowPoiBattle(false)
        setPoiPhase("questionWait")
        setQuestion(undefined)
        setAnswer(undefined)
      }, 15000)

      timeouts.push(finalTimeout)

      return () => {
        timeouts.forEach(clearTimeout)
      }
    }, [showPoiBattle])

    const negativeSummaries = [
      "教師の指導力不足で授業が形骸化する恐れがある。",
      "国語や算数など基礎科目をおろそかにする可能性がある。",
      "家庭環境によるIT格差を広げる危険がある。",
      "興味のない子どもには大きな負担になる。",
      "プログラミングは中学以降で学べば十分である。",
    ]

    const negativeFullText =
      "小学校からのプログラミング教育は必ずしも必要ではないと考えます。確かにデジタル社会においてプログラミングは重要なスキルの一つですが、それを小学生全員に必修化することには多くの問題があります。まず、教育現場の準備が不十分です。プログラミングを指導できる教師は限られており、十分な研修も整っていない状況で無理に導入すれば、形式的な授業になり、子どもにとっては単なる作業にすぎなくなる恐れがあります。次に、基礎学力とのバランスの問題があります。小学校は国語や算数といった基礎科目をしっかり身につけることが最優先であり、まだ十分に理解できていない段階で新たな負担を加えると、子どもにとっては学習の重荷となりかねません。また、家庭のIT環境格差も深刻です。パソコンやタブレットが家庭にある子どもとそうでない子どもの間で学習成果に差が生じ、不平等が拡大する可能性があります。さらに、すべての子どもがプログラミングに関心を持つとは限らず、興味のない子どもにとっては苦痛でしかありません。プログラミング教育は必要な子が中学や高校で選択して学べば十分であり、小学校段階で全員に義務付ける必要はないといえます。したがって、小学校からのプログラミング教育は時期尚早であり、必修化には慎重であるべきです。"
    return (
      <>
        <MatchingLayout
          className="flex flex-col justify-start"
          titleContent="小学校からのプログラミング教育は必要か"
        >
          {/* 仮配置: 肯定側立論 2分の例 */}
          <DebatePhaseTimer
            className="mt-4x"
            title="肯定側立論"
            seconds={120}
            isActive={true}
            titleColorClassName="text-[#82A9F9]"
          />
          {/* 相手の立論カード（動作確認用データを直指定） */}
          <DebateArgumentCard
            className="mb-200x w-full rounded-4x bg-transparent p-8x text-left"
            title="相手の立論"
            side="negative"
            summaries={negativeSummaries}
            fullText={negativeFullText}
            defaultOpen={false}
          />
          <MatchingBottomActions
            onOpenHint={() => {}}
            onOpenPoi={() => setShowPoiStart(true)}
            onOpenPoiMemo={() => {
              /* open memo */
            }}
            role="listener"
            localMicState="idle"
            onMicTap={() => {
              /* start recording */
            }}
          />
        </MatchingLayout>
        <PoiStartScreen isVisible={showPoiStart} />
        {showPoiBattle && (
          <PoiBattleScreen
            side="negative"
            role="questioner"
            phase={poiPhase}
            question={question}
            answer={answer}
            timerSeconds={30}
            className="fixed inset-0 z-50"
          />
        )}
      </>
    )
  }
