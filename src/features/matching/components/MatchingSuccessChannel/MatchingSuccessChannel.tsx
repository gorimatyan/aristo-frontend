import { useEchoPresence } from "@laravel/echo-react"
import type { MatchingSuccess } from "@/lib/webSocket/types/MatchingSuccess"

export const MatchingSuccessChannel = ({ matchId }: { matchId: string }) => {
  // マッチング成功イベントを購読
  useEchoPresence<MatchingSuccess>(
    "room." + matchId,
    [".MatchingSuccess"],
    (e) => {
      // eslint-disable-next-line no-console
      console.log("マッチング成功:", e)
    },
    [matchId],
  )

  return null
}
