"use client"

import { mergeClassNames } from "@/features/style/classnames"
import { MicOnIcon } from "@/features/icons/components/MicOnIcon"
import { MicOffIcon } from "@/features/icons/components/MicOffIcon"

type MicCaptureButtonProps = {
  state: "recording" | "idle" | "disabled"
  onClick?: () => void
  className?: string
  size?: number // 直径(px)
}

export const MicCaptureButton: React.FC<MicCaptureButtonProps> = ({
  state,
  onClick,
  className,
  size = 120,
}) => {
  const isRecording = state === "recording"
  const isDisabled = state === "disabled"

  return (
    <div
      className={mergeClassNames(
        "inline-flex flex-col items-center gap-8x",
        className,
      )}
    >
      {/* ボタン本体 */}
      <button
        type="button"
        onClick={!isDisabled ? onClick : undefined}
        aria-disabled={isDisabled}
        className={mergeClassNames(
          "relative isolate grid place-items-center rounded-full bg-white shadow-[inset_0_0_12px_rgba(0,0,0,0.35)]",
          isDisabled ? "cursor-not-allowed opacity-80" : "hover:brightness-95",
        )}
        style={{ width: size, height: size }}
      >
        {/* 赤いリングのパルス（録音時のみ） */}
        {isRecording && (
          <>
            <span className="mic-pulse absolute inset-0 -z-10 rounded-full" />
            <span
              className="mic-pulse absolute inset-0 -z-10 rounded-full"
              style={{ animationDelay: "300ms" }}
            />
          </>
        )}

        {/* 外周リング */}
        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/30" />

        {/* アイコン */}
        {state === "disabled" ? (
          <MicOffIcon className="h-[60%] w-[60%] fill-gray-400" />
        ) : (
          <MicOnIcon
            className={mergeClassNames(
              "h-[55%] w-[55%]",
              isRecording ? "fill-[#ff4747]" : "fill-black",
            )}
          />
        )}

        <style jsx>{`
          @keyframes micPulse {
            from {
              transform: scale(1);
              opacity: 0.45;
            }
            to {
              transform: scale(1.5);
              opacity: 0;
            }
          }
          .mic-pulse {
            border: 3px solid rgba(255, 71, 71, 0.65);
            animation: micPulse 1.2s ease-out infinite;
          }
        `}</style>
      </button>
    </div>
  )
}

export default MicCaptureButton
