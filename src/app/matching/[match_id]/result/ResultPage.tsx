"use client"
import { MatchingLayout } from "@/features/layout/components/MatchingLayout"
import { CategoryScore } from "@/features/matchResult/components/CategoryScore/CategoryScore"

export const ResultPage =
  (/**{ params }: { params: { match_id: string } }*/) => {
    return (
      <MatchingLayout
        className="flex flex-col justify-center"
        backgroundImageSrc="/assets/images/debate/u7544387239_A_black_and_white_photograph_of_two_men_in_suits__401b00a7-9a19-4101-b745-31536a1619e8_3.png"
        titleContent="小学校からのプログラミング教育は必要か"
      >
        <CategoryScore
          yourScore={10}
          yourUserName="太郎"
          opponentScore={10}
          opponentUserName="花子"
          category="pointOfInformation"
          className="mb-16x"
        />
      </MatchingLayout>
    )
  }
