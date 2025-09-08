import { mergeClassNames } from "@/features/style/classnames"
import type { ComponentPropsWithRef } from "react"

type MainHeaderProps = ComponentPropsWithRef<"header"> & {
  userName: string
  rightSide: React.ReactNode
  className?: string
}

export const MainHeader = ({
  userName,
  rightSide,
  className,
  ...props
}: MainHeaderProps) => {
  return (
    <header
      className={mergeClassNames(
        "fixed top-0 z-50 flex w-full max-w-[500px] items-center justify-between bg-gradient-to-b from-[#353535] to-black px-8x text-16x",
        className,
      )}
      {...props}
    >
      <div className="text-white">{userName}</div>
      <div>{rightSide}</div>
    </header>
  )
}
