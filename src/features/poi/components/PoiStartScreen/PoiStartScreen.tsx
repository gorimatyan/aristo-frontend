"use client"

import Image from "next/image"
import { mergeClassNames } from "@/features/style/classnames"

type PoiStartScreenProps = {
  isVisible: boolean
  className?: string
}

export const PoiStartScreen: React.FC<PoiStartScreenProps> = ({
  isVisible,
  className,
}) => {
  return (
    <div
      className={mergeClassNames(
        "fixed inset-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black text-white transition-opacity duration-1000 ease-in-out",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
    >
      {/* Point Of Information タイトル */}
      <div
        className={mergeClassNames(
          "mb-16x flex flex-col items-center justify-center transition-all delay-300 duration-1000 ease-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <h1 className="text-48x font-bold leading-[1.0]">Point</h1>
        <h1 className="text-48x font-bold leading-[1.0]">Of</h1>
        <h1 className="text-48x font-bold leading-[1.0]">Information</h1>
      </div>

      {/* アリストテレスの画像 */}
      <div
        className={mergeClassNames(
          "relative transition-all delay-500 duration-1000 ease-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <Image
          src="/assets/images/human/aristotle/S__104882180-removebg-preview (3).png"
          alt="Aristotle"
          width={400}
          height={600}
          className="h-auto w-320x"
          priority
        />
      </div>
    </div>
  )
}
