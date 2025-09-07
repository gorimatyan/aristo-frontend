import type { ComponentPropsWithRef } from "react"
import { mergeClassNames } from "../style/classnames"

type PositiveNegativeButtonProps = ComponentPropsWithRef<"button"> & {
  children: React.ReactNode
  buttonType: "negative" | "positive"
}

export const PositiveNegativeButton = ({
  onClick,
  children,
  className,
  buttonType,
  ...props
}: PositiveNegativeButtonProps) => {
  const colorClassName =
    buttonType === "negative"
      ? "bg-[#0D571E] border-[#117628]"
      : "bg-[#29518C] border-[#5680BE]"

  const textClassName =
    buttonType === "negative"
      ? "-left-24x text-[#117628]"
      : "-right-24x text-[#3F69A7]"

  return (
    <button
      type="button"
      onClick={onClick}
      className={mergeClassNames(
        "relative min-h-300x overflow-hidden px-8x text-16x",
        colorClassName,
        className,
      )}
      {...props}
    >
      {children}
      <span
        className={`absolute -bottom-4x flex flex-col items-center text-80x font-bold ${textClassName}`}
      >
        {buttonType === "negative" ? (
          <>
            <span>否</span>
            <span>定</span>
          </>
        ) : (
          <>
            <span>肯</span>
            <span>定</span>
          </>
        )}
      </span>
    </button>
  )
}
