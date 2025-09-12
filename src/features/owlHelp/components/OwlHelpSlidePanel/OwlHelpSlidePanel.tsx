"use client"

import Image from "next/image"
import { mergeClassNames } from "@/features/style/classnames"
import { CrossIcon } from "@/features/icons/components/CrossIcon"
import { BulletedList } from "@/features/bulletedText/components/BulletedList/BulletedList"

type OwlHelpSlidePanelProps = {
  isOpen: boolean
  className?: string
  heightVh?: number
  contents: string[]
  onClose?: () => void
}

export const OwlHelpSlidePanel: React.FC<OwlHelpSlidePanelProps> = ({
  isOpen,
  className,
  heightVh = 80,
  contents,
  onClose,
}) => {
  return (
    <div
      className={mergeClassNames(
        "fixed bottom-0 z-50 flex w-full justify-center overflow-hidden",
        "duration-400 transition-transform ease-out",
        isOpen ? "translate-y-0" : "translate-y-full",
        className,
      )}
      style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.9) 60%, transparent)",
        height: `${heightVh}dvh`,
      }}
    >
      <div className="max-w-480x px-12x pt-12x text-black">
        {/* ボード */}
        <div className="relative rounded-8x bg-[#d1a071] shadow-[0_6px_16px_rgba(0,0,0,0.5)]">
          <Image
            width={174}
            height={198}
            src="/assets/images/owl/owl_look.png"
            alt="owl_look"
            className="absolute left-0 top-[70dvh] z-10 h-148x rounded-2x object-contain opacity-10"
          />
          <Image
            src="/assets/images/memo/u7544387239_Create_a_clean_realistic_background_texture_of_a__0a6a6882-b111-47e0-a989-0a76f61f5bf7_3.png"
            alt="board"
            width={1000}
            height={1000}
            className="rounded-8x object-cover"
          />
          {/* 閉じるボタン */}
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            title="閉じる"
            className="absolute right-20x top-24x z-20 rounded-full p-10x text-white"
          >
            <CrossIcon className="h-16x w-16x fill-black" />
          </button>

          {/* クリップ */}
          <div
            onClick={onClose}
            className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[60%]"
          >
            <Image
              src="/assets/images/memo/スクリーンショット_2025-09-04_125651-removebg-preview.png"
              alt="clip"
              width={640}
              height={360}
              className="h-auto w-800x"
            />
          </div>

          {/* 紙コンテンツ */}
          <div className="absolute inset-x-6x bottom-6x top-16x overflow-hidden rounded-2x bg-white">
            <Image
              src="/assets/images/memo/paper.png"
              alt="paper"
              fill
              className="rounded-2x opacity-95"
            />

            <div className="relative z-10 h-full px-8x pb-12x pt-24x">
              {/* タイトル */}
              <div className="mb-8x flex flex-col items-center gap-6x px-8x text-14x font-bold">
                <Image
                  src="/assets/images/owl/owl_look.png"
                  alt="owl"
                  width={58}
                  height={66}
                  className="h-56x object-contain"
                />
                <span className="text-wrap">
                  相手の主張はここが弱点かもしれないホ...
                </span>
              </div>

              <div className="mb-12x h-[55dvh] w-full overflow-y-auto overflow-x-hidden pb-12x text-15x">
                <BulletedList
                  iconSrc="blackPen"
                  iconClassName="size-17x mt-3x"
                  items={contents}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
