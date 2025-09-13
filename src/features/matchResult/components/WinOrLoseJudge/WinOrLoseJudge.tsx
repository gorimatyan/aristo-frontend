import type { ComponentPropsWithRef } from "react"
import { forte } from "../../../../../styles/fonts"
import Image from "next/image"
import { mergeClassNames } from "@/features/style/classnames"

type WinOrLoseJudgeProps = ComponentPropsWithRef<"div"> & {
  judge: "win" | "lose"
}

export const WinOrLoseJudge = ({
  judge,
  className,
  ...props
}: WinOrLoseJudgeProps) => {
  const judgeText = judge === "win" ? "Win !!" : "Lose..."
  return (
    <div
      className={mergeClassNames(
        "flex flex-col items-center justify-center",
        className,
      )}
      {...props}
    >
      <div className="relative flex items-center justify-center">
        <div
          className={`${forte.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-48x font-bold`}
        >
          {judgeText}
        </div>
        <Image
          src="/assets/images/blurBackground/white_blur.png"
          alt="win"
          width={1000}
          height={1000}
          className="object-cover opacity-80"
        />
      </div>
      <Image
        src="/assets/images/owl/standing_owl.png"
        alt="aristotle"
        width={100}
        height={100}
        className="-mt-24x w-48x object-contain"
      />
    </div>
  )
}
