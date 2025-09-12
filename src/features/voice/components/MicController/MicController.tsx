"use client"

// 音声入力の開始/停止を管理する軽量コントローラ。
// 仕様:
// - 待機中にタップすると 3→2→1 のカウントダウン後に録音開始
// - 録音中はダブルタップで録音停止
// - カウントダウン中は追加タップを無効化

import { useRef, useState } from "react"
import MicCaptureButton from "@/features/voice/components/MicCaptureButton/MicCaptureButton"

type MicControllerProps = {
  state?: "idle" | "recording" | "disabled"
  onTap?: () => void
}

export const MicController: React.FC<MicControllerProps> = ({
  state: externalState,
  onTap,
}) => {
  // マイクUIの状態: idle(待機) / recording(録音中) / disabled(未使用)
  const [internalState, setInternalState] = useState<
    "idle" | "recording" | "disabled"
  >("idle")

  // 外部から状態が渡された場合はそれを使用、そうでなければ内部状態を使用
  const state = externalState ?? internalState
  // カウントダウン表示用。null で非表示。
  const [countdown, setCountdown] = useState<number | null>(null)
  // 直近タップ時刻（録音中のダブルタップ判定に利用）
  const lastTapRef = useRef(0)
  // ダブルタップとみなす間隔(ms)
  const DOUBLE_TAP_MS = 1000

  // 指定msだけ待つユーティリティ
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))
  // 指定秒数のカウントダウンを順次実行（3→2→1）。完了で countdown をクリア。
  const runCountdown = async (sec: number) => {
    for (const n of Array.from({ length: sec }, (_, i) => sec - i)) {
      setCountdown(n)
      await sleep(1000)
    }
    setCountdown(null)
  }

  // 録音を開始する（実際の getUserMedia / MediaRecorder 起動はここへ）
  const startRecording = async () => {
    try {
      // 例) await navigator.mediaDevices.getUserMedia({ audio: true })
      if (!externalState) {
        setInternalState("recording")
      }
    } catch {
      if (!externalState) {
        setInternalState("idle")
      }
    }
  }

  // 録音を停止する（実際の停止/保存処理はここへ）
  const stopRecording = async () => {
    // 例) MediaRecorder.stop() など
    if (!externalState) {
      setInternalState("idle")
    }
  }

  // タップ（pointer up）時のハンドラ
  const handleTap = async () => {
    // 外部のonTapが指定されている場合はそれを使用
    if (onTap) {
      onTap()
      return
    }

    // 無効/カウントダウン中は無視
    if (state === "disabled" || countdown !== null) return
    const now = performance.now()

    if (state === "recording") {
      // 録音中: ダブルタップで終了
      if (now - lastTapRef.current <= DOUBLE_TAP_MS) {
        lastTapRef.current = 0
        await stopRecording()
        return
      }
      lastTapRef.current = now
      setTimeout(() => {
        if (performance.now() - lastTapRef.current > DOUBLE_TAP_MS)
          lastTapRef.current = 0
      }, DOUBLE_TAP_MS + 50)
    } else {
      // 待機中: カウントダウン後に録音開始
      await runCountdown(3)
      await startRecording()
    }
  }

  return (
    <div>
      {/* カウントダウンは MicCaptureButton の中央に数値で表示される */}
      <MicCaptureButton
        state={state}
        countdown={countdown}
        onClick={handleTap}
      />
    </div>
  )
}
