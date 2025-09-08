"use client"

import { mergeClassNames } from "@/features/style/classnames"
import { MicController } from "@/features/voice/components/MicController/MicController"
import { OwlHelpButton } from "@/features/owlHelp/components/OwlHelpButton/OwlHelpButton"
import { PoiMemoButton } from "@/features/poi/components/PoiMemoButton/PoiMemoButton"

type MatchingBottomActionsProps = {
  onClickOwlHelp?: () => void
  onClickPoiMemo?: () => void
  className?: string
}

export const MatchingBottomActions: React.FC<MatchingBottomActionsProps> = ({
  onClickOwlHelp,
  onClickPoiMemo,
  className,
}) => {
  return (
    <div
      className={mergeClassNames(
        "fixed bottom-0 left-0 right-0 z-50 flex items-end justify-center",
        "bg-gradient-to-t from-black/85 to-transparent",
        "pb-16x pt-8x",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[500px] items-end justify-center gap-32x px-16x">
        <OwlHelpButton className="mt-2x" onClick={onClickOwlHelp} />

        <MicController />

        <PoiMemoButton onClick={onClickPoiMemo} />
      </div>
    </div>
  )
}
