"use client"
import { MatchingLayout } from "@/features/layout/components/MatchingLayout"
import { CategoryAccordion } from "@/features/matchResult/components/CategoryAccordion/CategoryAccordion"
import { OverallScore } from "@/features/matchResult/components/OverallScore/OverallScore"
import { GradientButton } from "@/features/button/GradientButton"
import { useRouter } from "next/navigation"

export const ResultSummaryPage =
  (/**{ params }: { params: { match_id: string } }*/) => {
    const router = useRouter()
    return (
      <MatchingLayout
        className="flex flex-col items-center justify-center pb-120x"
        backgroundImageSrc="/assets/images/debate/u7544387239_A_black_and_white_photograph_of_two_men_in_suits__401b00a7-9a19-4101-b745-31536a1619e8_3.png"
        titleContent="小学校からのプログラミング教育は必要か"
      >
        <OverallScore
          yourScore={10}
          yourUserName="太郎"
          opponentScore={10}
          opponentUserName="花子"
          yourSide="positive"
          isDisplayingWinOrLoseJudge={false}
        />

        <hr className="mb-32x w-5/6 border-white/50" />

        <CategoryAccordion
          category="pointOfInformation"
          yourScore={10}
          opponentScore={10}
        />
        <CategoryAccordion category="logos" yourScore={10} opponentScore={10} />
        <CategoryAccordion
          category="pathos"
          yourScore={10}
          opponentScore={10}
        />
        <CategoryAccordion category="ethos" yourScore={10} opponentScore={10} />

        <GradientButton
          className="mt-32x"
          item="終了"
          onClick={() => router.push("/")}
        />
      </MatchingLayout>
    )
  }
