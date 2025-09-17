import Image from "next/image"
import { MainHeader } from "@/features/header/components/MainHeader"
import type { ComponentProps } from "react"
import { mergeClassNames } from "@/features/style/classnames"
import { RegisterDialog } from "@/features/auth/components/RegisterDialog/RegisterDialog"
import { LoginDialog } from "@/features/auth/components/LoginDialog/LoginDialog"
import { useState } from "react"

type BackgroundLayoutProps = ComponentProps<"div"> & {
  backgroundImageSrc?: string
}

/**
 * ログインヘッダー＋背景画像をつけられるレイアウト
 *
 * @param backgroundImageSrc 背景画像のソース
 * @param children 子コンポーネント
 * @param className クラス名
 * @param props その他のプロパティ
 */
const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({
  backgroundImageSrc,
  children,
  className,
  ...props
}) => {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)

  const onClickLogin = () => {
    setIsLoginDialogOpen(true)
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

      {/* ログインダイアログ */}
      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
      />
    </div>
  )
}

export default BackgroundLayout
