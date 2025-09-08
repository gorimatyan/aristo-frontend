import { mergeClassNames } from "@/features/style/classnames"
import type { ComponentPropsWithRef } from "react"
import { useState } from "react"
import { TriangleIcon } from "@/features/icons/components/TriangleIcon"

type AccordionHeaderProps = ComponentPropsWithRef<"header"> & {
  titleContent: React.ReactNode
  className?: string
  positiveUserName?: string
  negativeUserName?: string
  isOpen?: boolean
  defaultOpen?: boolean
  onToggle?: (open: boolean) => void
}

export const AccordionHeader = ({
  titleContent,
  className,
  positiveUserName = "あなた",
  negativeUserName = "相手",
  isOpen,
  defaultOpen = false,
  onToggle,
  ...props
}: AccordionHeaderProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const open = isOpen ?? internalOpen

  const toggle = () => {
    const next = !open
    if (onToggle) onToggle(next)
    if (isOpen === undefined) setInternalOpen(next)
  }

  return (
    <header
      className={mergeClassNames(
        "fixed top-0 z-50 w-full max-w-[500px] bg-gradient-to-b from-[#353535] to-black text-white",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={toggle}
        className="flex w-full flex-col items-center justify-center pb-8x pt-4x text-16x font-bold"
      >
        {titleContent}
        {/* 三角形インジケーター */}
        <div className="relative mt-2x w-full">
          <div className="absolute left-1/2 -translate-x-1/2">
            <TriangleIcon
              className={mergeClassNames(
                "transition-transform duration-300 ease-out will-change-transform",
                open ? "translate-y-64x rotate-0" : "translate-y-0 -rotate-180",
              )}
            />
          </div>
        </div>

        {/* アコーディオン部分 */}
        <div
          className={mergeClassNames(
            "w-full overflow-hidden bg-black/85 transition-[max-height,opacity] duration-300 ease-out",
            open ? "max-h-72x opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="flex items-center justify-center gap-24x py-8x">
            <div className="text-center">
              <div className="text-14x text-gray-300">{positiveUserName}</div>
              <div className="text-24x font-bold text-[#3F69A7]">肯定</div>
            </div>
            <div className="text-18x font-bold text-white">VS</div>
            <div className="text-center">
              <div className="text-14x text-gray-300">{negativeUserName}</div>
              <div className="text-24x font-bold text-[#117628]">否定</div>
            </div>
          </div>
          {/* 下余白（矢印が降りるスペース） */}
          <div className="pb-10x" />
        </div>
      </button>
    </header>
  )
}
