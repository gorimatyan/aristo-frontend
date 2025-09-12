"use client"

import Image from "next/image"
import { mergeClassNames } from "@/features/style/classnames"
import { useRef, useState } from "react"

type PoiButtonProps = {
  onClick?: () => void
  className?: string
  label?: string
  confirmTimeoutMs?: number // 1回目タップ後に待つ時間
}

export const PoiButton: React.FC<PoiButtonProps> = ({
  onClick,
  className,
  label = "POI",
  confirmTimeoutMs = 2000,
}) => {
  const [armed, setArmed] = useState(false)
  const timerRef = useRef<number | null>(null)
  const lastTapRef = useRef<number>(0)
  const DOUBLE_TAP_MS = 300

  const disarm = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setArmed(false)
  }

  const handleTap = () => {
    const now = performance.now()
    // ダブルタップ即起動
    if (now - lastTapRef.current <= DOUBLE_TAP_MS) {
      lastTapRef.current = 0
      disarm()
      onClick?.()
      return
    }
    lastTapRef.current = now

    if (armed) {
      disarm()
      onClick?.()
      return
    }
    // 1回目: 武装表示に切替
    setArmed(true)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      disarm()
    }, confirmTimeoutMs)
  }

  return (
    <button
      type="button"
      onClick={handleTap}
      className={mergeClassNames(
        "mb-2x flex w-50x flex-col items-center text-15x font-bold text-white",
        className,
      )}
      aria-pressed={armed}
    >
      {armed ? (
        <span className="inline-grid size-48x place-items-center rounded-full border-3x border-[#82A9F9] bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.2)]">
          <span className="select-none text-center text-15x font-bold leading-[1.05] text-[#3F69A7]">
            POI
            <br />
            発動
          </span>
        </span>
      ) : (
        <span className="inline-grid place-items-center rounded-full">
          <Image
            src="/assets/images/human/aristotle/S__104882180-removebg-preview (3).png"
            alt="poi"
            width={128}
            height={128}
            className="h-46x w-46x object-contain"
          />
        </span>
      )}
      <span className="text-15x font-bold text-white">
        {armed ? "発動？" : label}
      </span>
    </button>
  )
}

export default PoiButton
