"use client"
import { MatchingLayout } from "@/features/layout/components/MatchingLayout"
import DebateArgumentCard from "@/features/matching/components/DebateArgumentCard/DebateArgumentCard"
import { DebatePhaseTimer } from "@/features/matching/components/DebatePhaseTimer/DebatePhaseTimer"
import { MatchingBottomActions } from "@/features/matching/components/MatchingBottomActions/MatchingBottomActions"

export const StartPage =
  (/**{ params }: { params: { match_id: string } }*/) => {
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
          onOpenHint={() => {
            /* open help */
          }}
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
    )
  }
