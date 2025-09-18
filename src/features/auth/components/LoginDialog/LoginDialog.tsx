"use client"
import { useState } from "react"
import { CrossIcon } from "@/features/icons/components/CrossIcon"
import axios from "axios"

type LoginDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export const LoginDialog: React.FC<LoginDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoginLoading(true)
    try {
      // CSRF保護の初期化
      await axios.get("http://localhost:8080/sanctum/csrf-cookie")

      const response = await axios.post("http://localhost:8080/api/login", {
        email: email,
        password: password,
      })

      // ログイン成功時の処理
      localStorage.setItem("auth_token", response.data.token)

      alert("ログイン成功しました" + response.data)
      return response.data
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoginLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください")
      return
    }

    try {
      await login(email, password)
      // ログイン成功時はダイアログを閉じる
      onClose()
      setEmail("")
      setPassword("")
    } catch (error) {
      console.error("ログイン失敗:", error)
      setError(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
      )
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <CrossIcon className="h-6 w-6" />
        </button>

        {/* タイトル */}
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          ログイン
        </h2>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* エラーメッセージ */}
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* メールアドレス */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="example@example.com"
              disabled={isLoginLoading}
            />
          </div>

          {/* パスワード */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="パスワードを入力"
              disabled={isLoginLoading}
            />
          </div>

          {/* ログインボタン */}
          <button
            type="submit"
            disabled={isLoginLoading}
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
          >
            {isLoginLoading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  )
}
