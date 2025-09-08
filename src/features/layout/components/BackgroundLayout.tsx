import Image from "next/image"
import { MainHeader } from "@/features/header/components/MainHeader"
import type { ComponentProps } from "react"
import { mergeClassNames } from "@/features/style/classnames"

type BackgroundLayoutProps = ComponentProps<"div"> & {
  backgroundImageSrc?: string
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({
  backgroundImageSrc,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={mergeClassNames("relative mt-32x min-h-dvh w-full", className)}
      {...props}
    >
      <MainHeader
        className="h-32x"
        userName="ユーザー名"
        rightSide={<div>右側</div>}
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
    </div>
  )
}

export default BackgroundLayout
