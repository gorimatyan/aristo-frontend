"use client"

import { useMutation } from "@tanstack/react-query"
import type { UseMutationOptions } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api/client/api"
import { PATH } from "@/lib/api/constants/path"

// ルーム作成のリクエスト型
export type CreateRoomRequest = {
  topicId: number
  themeName: string
  preferredSide?: "positive" | "negative"
}

// ルーム作成のレスポンス型（API仕様に合わせて修正）
export type CreateRoomResponse = {
  message: string
  data: {
    room_id: string
    side: "positive" | "negative"
    matched: boolean
    channel: string
  }
}

// カスタムフックのオプション型
type Options = UseMutationOptions<CreateRoomResponse, Error, CreateRoomRequest>

/**
 * マッチングルームを新規作成するカスタムフック
 * @param options useMutationのオプション
 */
export const usePostCreateMatchingRoom = (options?: Options) => {
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
      // 成功メッセージを表示
      alert(data.message)

      // 作成されたルームのページに遷移
      router.push(`/matching/${data.data.room_id}`)
    },
    ...options,
  })
}
