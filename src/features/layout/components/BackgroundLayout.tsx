import Image from "next/image"
import { MainHeader } from "@/features/header/components/MainHeader"
import type { ComponentProps } from "react"
import { mergeClassNames } from "@/features/style/classnames"
import { RegisterDialog } from "@/features/auth/components/RegisterDialog/RegisterDialog"
import { useState } from "react"
import axios from "axios"

type BackgroundLayoutProps = ComponentProps<"div"> & {
  backgroundImageSrc?: string
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({
  backgroundImageSrc,
  children,
  className,
  ...props
}) => {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)

  const login = async (email: string, password: string) => {
    // CSRF保護の初期化
    await axios.get("http://localhost:8080/sanctum/csrf-cookie")
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email: email,
        password: password,
      })
      // ログイン成功時の処理
      localStorage.setItem("user", JSON.stringify(response.data.user))
      return response.data
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }
  // API呼び出しの例
  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get("/api/user")
  //     return response.data
  //   } catch (error) {
  //     //   if (error.response.status === 401) {
  //     //     // 未認証時の処理
  //     //     router.push('/login')
  //     //   }
  //   }
  // }

  const onClickLogin = () => {
    login("test@test.com", "password")
    // fetchUserData()
  }

  const onClickRegister = () => {
    setIsRegisterDialogOpen(true)
  }

  return (
    <div
      className={mergeClassNames("relative mt-32x min-h-dvh w-full", className)}
      {...props}
    >
      <MainHeader
        className="h-32x"
        userName="ユーザー名"
        rightSide={
          <div className="flex gap-8x">
            <button
              onClick={onClickRegister}
              className="rounded-8x bg-blue-500 px-16x py-8x text-14x font-bold text-white hover:bg-blue-600"
            >
              新規登録
            </button>
            <button
              onClick={onClickLogin}
              className="rounded-8x border border-gray-300 px-16x py-8x text-14x font-bold text-gray-700 hover:bg-gray-50"
            >
              ログイン
            </button>
          </div>
        }
      />
      {backgroundImageSrc && (
        <Image
          src={backgroundImageSrc}
          alt="background"
          fill
          priority
          className="-z-10 object-cover opacity-40 blur-[4px]"
        />
      )}
      {children}

      {/* 新規登録ダイアログ */}
      <RegisterDialog
        isOpen={isRegisterDialogOpen}
        onClose={() => setIsRegisterDialogOpen(false)}
      />
    </div>
  )
}

export default BackgroundLayout
