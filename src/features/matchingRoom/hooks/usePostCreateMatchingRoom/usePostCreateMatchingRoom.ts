/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UseMutationOptions } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api/client/api"
import { PATH } from "@/lib/api/constants/path"

// ルーム作成のリクエスト型
interface CreateRoomRequest {
  topicId: number
  themeName: string
  preferredSide?: "positive" | "negative"
}

// ルーム作成のレスポンス型
interface CreateRoomResponse {
  roomId: string
  roomCode: string
  status: "waiting" | "ready" | "in_progress" | "completed"
  theme: {
    id: string
    title: string
    description: string
  }
  participants: {
    positive: any | null
    negative: any | null
  }
  created_at: string
}

// カスタムフックのオプション型
type Options = UseMutationOptions<CreateRoomResponse, Error, CreateRoomRequest>

/**
 * マッチングルームを新規作成するカスタムフック
 * @param options useMutationのオプション
 */
export const usePostCreateMatchingRoom = (options?: Options) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationKey: ["createMatchingRoom"],
    mutationFn: async (body: CreateRoomRequest) => {
      const endpoint = PATH.ROOM_JOIN

      // ルーム作成APIは認証必要
      const response = await apiClient.post(endpoint, body, undefined, true) // requiresAuth: true

      if (!response.data) {
        throw new Error("ルームの作成に失敗しました")
      }

      return response.data as CreateRoomResponse
    },
    onError: (error) => {
      console.error("ルーム作成に失敗しました:", error)
      // エラーメッセージを表示（必要に応じてtoast等を使用）
      alert("ルームの作成に失敗しました")
    },
    onSuccess: (data) => {
      // ルーム一覧のクエリを無効化（必要に応じて）
      queryClient.invalidateQueries({
        queryKey: ["matchingRooms"],
      })

      // 成功メッセージを表示
      alert("ルームを作成しました！")

      // 作成されたルームのページに遷移
      router.push(`/matching/${data.roomId}`)
    },
    ...options,
  })
}
