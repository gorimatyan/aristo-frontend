"use client"

import Image from "next/image"
import { mergeClassNames } from "@/features/style/classnames"

type OwlHelpButtonProps = {
  onClick?: () => void
  className?: string
  label?: string
}

export const OwlHelpButton: React.FC<OwlHelpButtonProps> = ({
  onClick,
  className,
  label = "ふくろうヘルプ",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={mergeClassNames(
        "flex flex-col items-center text-15x font-bold text-white",
        className,
      )}
    >
      <span className="inline-grid place-items-center rounded-full">
        <Image
          src="/assets/images/owl/standing_owl.png"
          alt="owl help"
          width={96}
          height={96}
          className="h-48x w-48x object-contain"
        />
      </span>
      <span>{label}</span>
    </button>
  )
}

export default OwlHelpButton
