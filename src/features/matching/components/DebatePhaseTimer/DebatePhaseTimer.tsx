"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { mergeClassNames } from "@/features/style/classnames"

type DebatePhaseTimerProps = {
  title: string
  seconds: number
  isActive: boolean
  className?: string
  titleColorClassName?: string // 例: text-[#3F69A7]
  onTimeout?: () => void
}

export const DebatePhaseTimer: React.FC<DebatePhaseTimerProps> = ({
  title,
  seconds,
  isActive,
  className,
  titleColorClassName,
  onTimeout,
}) => {
  const [remaining, setRemaining] = useState(seconds)
  const [expired, setExpired] = useState(false)
  const intervalRef = useRef<number | null>(null)

  // isActive が true になった瞬間に残り時間をリセットして開始
  useEffect(() => {
    if (isActive) {
      // 新しいフェーズ開始
      if (intervalRef.current) window.clearInterval(intervalRef.current)
      setRemaining(seconds)
      setExpired(false)
      intervalRef.current = window.setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) window.clearInterval(intervalRef.current)
            intervalRef.current = null
            setExpired(true)
            onTimeout?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      // 停止/一時停止
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isActive, seconds, onTimeout])

  // mm:ss 表示
  const timeText = useMemo(() => {
    const mm = Math.floor(remaining / 60)
    const ss = remaining % 60
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
    return `${mm}:${pad(ss)}`
  }, [remaining])

  return (
    <div
      className={mergeClassNames(
        "flex flex-col items-center justify-center",
        className,
      )}
    >
      <div
        className={mergeClassNames(
          "text-24x font-extrabold",
          titleColorClassName ?? "text-white",
        )}
      >
        {title}
      </div>
      <div
        className={mergeClassNames(
          "mt-2x text-24x font-extrabold",
          expired ? "text-red-500" : "text-white",
        )}
      >
        {timeText}
      </div>
    </div>
  )
}
