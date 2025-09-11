"use client"

import { mergeClassNames } from "@/features/style/classnames"
import Image from "next/image"

type bulletIconSrcType = "whitePen" | "blackPen"

const bulletIconSrc: Record<bulletIconSrcType, string> = {
  whitePen: "/assets/images/memo/pen.png",
  blackPen: "/assets/images/memo/black_pen.png",
}

type BulletedListProps = {
  items: string[]
  iconSrc?: bulletIconSrcType
  iconAlt?: string
  className?: string
  itemClassName?: string
  iconClassName?: string
  textClassName?: string
}

export const BulletedList: React.FC<BulletedListProps> = ({
  items,
  iconSrc = "whitePen",
  iconAlt = "bullet",
  className = "",
  itemClassName = "",
  iconClassName = "mt-7x size-14x",
  textClassName = "",
}) => {
  return (
    <ul
      className={mergeClassNames(
        `flex flex-col items-start gap-6x p-12x text-start text-15x font-bold leading-[1.4] ${className}`,
      )}
    >
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-6x ${itemClassName}`}>
          <Image
            src={bulletIconSrc[iconSrc]}
            alt={iconAlt}
            width={100}
            height={100}
            className={iconClassName}
          />
          <span className={textClassName}>{item}</span>
        </li>
      ))}
    </ul>
  )
}
