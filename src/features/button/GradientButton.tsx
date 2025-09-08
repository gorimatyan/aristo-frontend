"use client"

import type { ComponentPropsWithRef } from "react"
import { mergeClassNames } from "../style/classnames"

type GradientButtonProps = ComponentPropsWithRef<"button"> & {
  item: React.ReactNode
}

export const GradientButton = ({
  item,
  onClick,
  className,
}: GradientButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={mergeClassNames(
        "w-full bg-[linear-gradient(90deg,transparent_0%,#3F3F3F_40%,#3F3F3F_60%,transparent_100%)] px-24x py-12x text-18x font-bold tracking-wide text-white shadow-[0_2px_8px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {item}
    </button>
  )
}
