import Image from "next/image"
import { MainHeader } from "@/features/header/components/MainHeader"

interface BackgroundLayoutProps {
  backgroundImageSrc: string
  children: React.ReactNode
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({
  backgroundImageSrc,
  children,
}) => {
  return (
    <div className="relative mt-32x min-h-dvh w-full">
      <MainHeader
        className="h-32x"
        userName="ユーザー名"
        rightSide={<div>右側</div>}
      />
      <Image
        src={backgroundImageSrc}
        alt="background"
        fill
        priority
        className="-z-10 object-cover opacity-40 blur-[4px]"
      />
      {children}
    </div>
  )
}

export default BackgroundLayout
