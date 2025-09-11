"use client"

import { mergeClassNames } from "@/features/style/classnames"
import { useState } from "react"
import { MicCaptureButton } from "@/features/voice/components/MicCaptureButton/MicCaptureButton"
import { OwlHelpButton } from "@/features/owlHelp/components/OwlHelpButton/OwlHelpButton"
import { PoiMemoButton } from "@/features/poi/components/PoiMemoButton/PoiMemoButton"
import { PoiMemoSlidePanel } from "@/features/poi/components/PoiMemoSlidePanel/PoiMemoSlidePanel"
import PoiButton from "@/features/poi/components/PoiButton/PoiButton"

type Role = "listener" | "speaker"
type LocalMicState = "idle" | "countdown" | "recording" | "disabled"

type MatchingBottomActionsProps = {
  role: Role
  localMicState: LocalMicState
  countdown?: number | null
  className?: string

  onMicTap: () => void
  onOpenPoi?: () => void
  onOpenHint?: () => void
  onOpenPoiMemo?: () => void
}

export const MatchingBottomActions: React.FC<MatchingBottomActionsProps> = ({
  role,
  localMicState,
  countdown,
  className,
  onMicTap,
  onOpenPoi,
  onOpenHint,
  onOpenPoiMemo,
}) => {
  const [showMemo, setShowMemo] = useState(false)

  const handleOpenMemo = () => {
    setShowMemo(true)
    onOpenPoiMemo?.()
  }
  const handleCloseMemo = () => setShowMemo(false)

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
        {role === "listener" ? (
          <PoiButton onClick={onOpenPoi} />
        ) : (
          <OwlHelpButton className="mt-2x" onClick={onOpenHint} />
        )}

        <MicCaptureButton
          state={
            localMicState === "recording"
              ? "recording"
              : localMicState === "disabled"
                ? "disabled"
                : "idle"
          }
          countdown={localMicState === "countdown" ? (countdown ?? 3) : null}
          onClick={onMicTap}
        />

        {role === "listener" ? (
          <PoiMemoButton onClick={handleOpenMemo} />
        ) : (
          <span className="block w-46x" />
        )}
      </div>
      <PoiMemoSlidePanel isOpen={showMemo} onClose={handleCloseMemo} />
    </div>
  )
}
