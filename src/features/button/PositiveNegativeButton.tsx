import type { ComponentPropsWithRef } from "react"
import { mergeClassNames } from "../style/classnames"
import { useState, useEffect } from "react"

type PositiveNegativeButtonProps = ComponentPropsWithRef<"button"> & {
  children: React.ReactNode
  buttonType: "negative" | "positive"
  selected: boolean
}

export const PositiveNegativeButton = ({
  onClick,
  children,
  className,
  buttonType,
  selected,
  ...props
}: PositiveNegativeButtonProps) => {
  const borderColorClassName =
    buttonType === "negative" ? "border-[#117628]" : "border-[#5680BE]"

  const bgColorClassName = () => {
    if (selected) {
      return buttonType === "negative"
        ? "bg-[#39C058] border-[#117628]"
        : "bg-[#659AE3] border-[#5680BE]"
    } else {
      return buttonType === "negative"
        ? "bg-[#0D571E] border-[#117628]"
        : "bg-[#29518C] border-[#5680BE]"
    }
  }

  const textClassName =
    buttonType === "negative"
      ? "-right-20x -bottom-8x text-[#117628]"
      : "-left-20x -bottom-8x text-[#3F69A7]"

  const [ripple, setRipple] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (selected) {
      setRipple(true)
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setRipple(false)
        setIsAnimating(false)
      }, 600)
      return () => clearTimeout(timer)
    } else {
      setRipple(false)
      setIsAnimating(false)
    }
  }, [selected])

  return (
    <button
      type="button"
      onClick={!isAnimating ? onClick : undefined}
      className={mergeClassNames(
        "relative overflow-hidden rounded-6x px-8x text-16x",
        borderColorClassName,
        bgColorClassName(),
        className,
      )}
      {...props}
    >
      {ripple && (
        <span
          className="ripple-effect"
          style={{
            left: buttonType === "positive" ? "0" : "auto",
            right: buttonType === "negative" ? "0" : "auto",
          }}
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10">
        {children}
      </div>
      <p
        className={`absolute -bottom-4x flex items-center text-100x font-bold leading-[1.1] ${textClassName}`}
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
      </p>
    </button>
  )
}
