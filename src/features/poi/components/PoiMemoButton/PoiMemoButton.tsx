"use client"

import Image from "next/image"
import { mergeClassNames } from "@/features/style/classnames"

type PoiMemoButtonProps = {
  onClick?: () => void
  className?: string
  label?: string
}

export const PoiMemoButton: React.FC<PoiMemoButtonProps> = ({
  onClick,
  className,
  label = "POIの記録",
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
      <span className="inline-grid place-items-center rounded-full p-6x">
        <Image
          src="/assets/images/memo/memo.png"
          alt="poi memo"
          width={96}
          height={96}
          className="h-40x w-40x object-contain"
        />
      </span>
      <span>{label}</span>
    </button>
  )
}

export default PoiMemoButton
