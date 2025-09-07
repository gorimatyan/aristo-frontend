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
        "w-full bg-[linear-gradient(90deg,transparent_0%,#3F3F3F_40%,#3F3F3F_60%,transparent_100%)] px-6 py-3 text-18x font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <span className="tracking-wide">{item}</span>
    </button>
  )
}
