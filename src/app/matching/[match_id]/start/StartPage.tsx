"use client"
import { MatchingLayout } from "@/features/layout/components/MatchingLayout"
import { MatchingBottomActions } from "@/features/matching/components/MatchingBottomActions/MatchingBottomActions"

export const StartPage =
  (/**{ params }: { params: { match_id: string } }*/) => {
    return (
      <MatchingLayout
        className="flex flex-col justify-start"
        titleContent="小学校からのプログラミング教育は必要か"
      >
        コンテンツが入るよーコンテンツが入るよーコンテンツが入るよーコンテンツが入るよーコンテンツが入るよーコンテンツが入るよーコンテンツが入るよーコンテンツが入るよーコンテンツが入るよーコンテンツが入るよーコンテンツが入るよーコンテンツが入るよー
        <MatchingBottomActions
          onClickOwlHelp={() => {
            /* open help */
          }}
          onClickPoiMemo={() => {
            /* open memo */
          }}
        />
      </MatchingLayout>
    )
  }
