"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UseMutationOptions } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client/api"
import { PATH } from "@/lib/api/constants/path"

// ルーム退出のリクエスト型（ボディは空）
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type LeaveRoomRequest = {}

// ルーム退出のレスポンス型（API仕様に合わせて修正）
export type LeaveRoomResponse = {
  message: string
}

// カスタムフックのオプション型
type Options = UseMutationOptions<LeaveRoomResponse, Error, LeaveRoomRequest>

/**
 * マッチングルームから退出するカスタムフック
 *
 * ユーザーが参加中のすべてのルームから一括で退出します。
 * 認証済みユーザーのみが使用可能です。
 *
 * @param options useMutationのオプション
 *
 * @example
 * ```tsx
 * import { usePostLeaveMatchingRoom } from "@/features/matchingRoom/hooks/usePostLeaveMatchingRoom"
 *
 * function LeaveRoomButton() {
 *   const { mutate: leaveRoom, isPending } = usePostLeaveMatchingRoom({
 *     onSuccess: (data) => {
 *       console.log(data.message) // "ルームから退出しました"
 *       // ホームページに遷移など
 *     },
 *     onError: (error) => {
 *       console.error("退出に失敗:", error)
 *     }
 *   })
 *
 *   return (
 *     <button
 *       onClick={() => leaveRoom({})}
 *       disabled={isPending}
 *     >
 *       {isPending ? "退出中..." : "ルームから退出"}
 *     </button>
 *   )
 * }
 * ```
 */
export const usePostLeaveMatchingRoom = (options?: Options) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["leaveMatchingRoom"],
    mutationFn: async (body: LeaveRoomRequest) => {
      const endpoint = PATH.ROOM_LEAVE

      // ルーム退出APIは認証必要
      const response = await apiClient.post(endpoint, body, undefined, true) // requiresAuth: true

      if (!response.data) {
        throw new Error("ルームの退出に失敗しました")
      }

      return response.data as LeaveRoomResponse
    },
    onError: (error) => {
      console.error("ルーム退出に失敗しました:", error)
      // エラーメッセージを表示（必要に応じてtoast等を使用）
      alert("ルームの退出に失敗しました")
    },
    onSuccess: (data) => {
      // ルーム一覧のクエリを無効化
      queryClient.invalidateQueries({
        queryKey: ["matchingRooms"],
      })

      // 成功メッセージを表示
      alert(data.message)
    },
    ...options,
  })
}
