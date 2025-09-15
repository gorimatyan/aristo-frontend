"use client"

import { useState } from "react"
import { GradientButton } from "@/features/button/GradientButton"
import { CrossIcon } from "@/features/icons/components/CrossIcon"
import axios from "axios"

type RegisterDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export const RegisterDialog: React.FC<RegisterDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("パスワードが一致しません")
      return
    }

    if (!email || !password) {
      alert("IDとパスワードを入力してください")
      return
    }

    setIsLoading(true)

    try {
      // API呼び出し
      await axios.post("http://localhost:8080/api/register", {
        name: "test",
        email,
        password,
        password_confirmation: confirmPassword,
      })

      // 成功時の処理
      alert("登録が完了しました！")
      onClose()

      // フォームリセット
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error("登録エラー:", error)
      alert("登録に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-400x rounded-16x bg-white p-32x shadow-2xl">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute right-16x top-16x rounded-full p-8x hover:bg-gray-100"
        >
          <CrossIcon className="h-24x w-24x fill-gray-600" />
        </button>

        {/* タイトル */}
        <div className="mb-24x text-center">
          <h2 className="text-24x font-bold text-gray-900">新規登録</h2>
          <p className="mt-8x text-14x text-gray-600">
            Aristoでディベートを始めましょう
          </p>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-20x text-gray-700">
          {/* メールアドレス */}
          <div>
            <label
              htmlFor="email"
              className="block text-14x font-bold text-gray-700"
            >
              メールアドレス
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレスを入力"
              className="mt-4x w-full rounded-8x border border-gray-300 px-16x py-12x text-16x focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              disabled={isLoading}
            />
          </div>

          {/* パスワード */}
          <div>
            <label
              htmlFor="password"
              className="block text-14x font-bold text-gray-700"
            >
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              className="mt-4x w-full rounded-8x border border-gray-300 px-16x py-12x text-16x focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              disabled={isLoading}
            />
          </div>

          {/* パスワード確認 */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-14x font-bold text-gray-700"
            >
              パスワード確認
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="パスワードを再入力"
              className="mt-4x w-full rounded-8x border border-gray-300 px-16x py-12x text-16x focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              disabled={isLoading}
            />
          </div>

          {/* ボタン */}
          <div className="flex gap-12x pt-8x">
            <GradientButton
              type="button"
              item="キャンセル"
              onClick={onClose}
              className="flex-1 py-12x text-16x"
              disabled={isLoading}
            />
            <GradientButton
              type="submit"
              onClick={handleSubmit}
              item={isLoading ? "登録中..." : "登録"}
              className="flex-1 py-12x text-16x"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterDialog
