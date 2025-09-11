"use client"

import Image from "next/image"
import { mergeClassNames } from "@/features/style/classnames"
import { TriangleIcon } from "@/features/icons/components/TriangleIcon"
import useEmblaCarousel from "embla-carousel-react"
import { CrossIcon } from "@/features/icons/components/CrossIcon"
import { ArrowGradientGbIcon } from "@/features/icons/components/ArrowGradientGbIcon"
import { ArrowGradientBgIcon } from "@/features/icons/components/ArrowGradientBgIcon"
import { useEffect, useState } from "react"

type Direction = "positiveToNegative" | "negativeToPositive"

type PoiMemoSlidePanelProps = {
  isOpen: boolean
  initialDirection?: Direction
  onToggleDirection?: (next: Direction) => void
  question?: string
  answer?: string
  className?: string
  heightVh?: number
  contentPositiveToNegative?: { question: string; answer: string }
  contentNegativeToPositive?: { question: string; answer: string }
  onClose?: () => void
}

export const PoiMemoSlidePanel: React.FC<PoiMemoSlidePanelProps> = ({
  isOpen,
  initialDirection = "positiveToNegative",
  onToggleDirection,
  question = "プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクプログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？プログラミングは色々なところにスクールがあるのでそれで学べばよいのでは？ールがあるのでそれで学べばよいのでは？ 学ぶきっかけも日常の中でよくあるのでわざわざ学校で教える必要が無いと思いますがいかがですか？",
  answer = "それなら学校の勉強だって塾で勉強できるから義務教育に要らなくないですか？",
  className,
  heightVh = 80,
  contentPositiveToNegative,
  contentNegativeToPositive,
  onClose,
}) => {
  const [slideIndex, setSlideIndex] = useState(
    initialDirection === "positiveToNegative" ? 0 : 1,
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 })
  const dir: Direction =
    slideIndex === 0 ? "positiveToNegative" : "negativeToPositive"

  const handlePrev = () => emblaApi?.scrollPrev()
  const handleNext = () => emblaApi?.scrollNext()

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap() % 2
      setSlideIndex(idx)
      onToggleDirection?.(
        idx === 0 ? "positiveToNegative" : "negativeToPositive",
      )
    }
    emblaApi.on("select", onSelect)
    emblaApi.scrollTo(slideIndex, true)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi])

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

            <div className="relative z-10 h-full px-12x pb-12x pt-24x">
              {/* タイトル */}
              <div className="mb-8x flex items-center gap-6x px-8x text-14x font-bold">
                <Image
                  src="/assets/images/owl/standing_owl.png"
                  alt="owl"
                  width={28}
                  height={28}
                />
                <span>POIの質問と回答だホー！</span>
              </div>

              {/* 切替UI + サイドナビゲーション */}
              <div className="mb-6x flex items-center justify-between px-8x">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="prev"
                  className="p-2x active:scale-95"
                >
                  <TriangleIcon className="h-10x w-12x -rotate-90 fill-black" />
                </button>
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center gap-8x">
                    {dir === "positiveToNegative" ? (
                      <>
                        <span className="text-18x font-bold text-[#3F69A7]">
                          肯定
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            dir === "positiveToNegative"
                              ? handleNext()
                              : handlePrev()
                          }
                          aria-label="swap direction"
                          className="active:scale-95"
                        >
                          <ArrowGradientGbIcon className="h-10x w-18x" />
                        </button>
                        <span className="text-18x font-bold text-[#117628]">
                          否定
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-18x font-bold text-[#117628]">
                          否定
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            dir === "negativeToPositive"
                              ? handleNext()
                              : handlePrev()
                          }
                          aria-label="swap direction"
                          className="active:scale-95"
                        >
                          <ArrowGradientBgIcon className="h-10x w-18x" />
                        </button>
                        <span className="text-18x font-bold text-[#3F69A7]">
                          肯定
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-12x text-gray-600">POI</span>
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="next"
                  className="p-2x active:scale-95"
                >
                  <TriangleIcon className="h-10x w-12x rotate-90 fill-black" />
                </button>
              </div>

              {/* QA（2面スライド） */}
              {(() => {
                const pn = contentPositiveToNegative ?? { question, answer }
                const np = contentNegativeToPositive ?? { question, answer }
                return (
                  <div
                    className="mb-12x h-[55dvh] w-full overflow-y-auto overflow-x-hidden px-4x pb-12x"
                    ref={emblaRef}
                  >
                    <div className="flex">
                      <div className="relative min-w-0 shrink-0 basis-full pr-8x">
                        <div className="mb-8x text-14x">
                          <div className="mb-4x font-bold">質問：</div>
                          <p className="leading-[1.3]">{pn.question}</p>
                        </div>
                        <div className="text-14x">
                          <div className="mb-4x font-bold">回答：</div>
                          <p className="leading-[1.3]">{pn.answer}</p>
                        </div>
                      </div>
                      <div className="relative min-w-0 shrink-0 basis-full pl-8x">
                        <div className="mb-8x text-14x">
                          <div className="mb-4x font-bold">質問：</div>
                          <p className="leading-[1.3]">{np.question}</p>
                        </div>
                        <div className="text-14x">
                          <div className="mb-4x font-bold">回答：</div>
                          <p className="leading-[1.3]">{np.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </div>
      {/* ページングドット */}
      <div className="absolute bottom-10x left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-6x rounded-full bg-white px-8x py-4x">
        <span
          className={mergeClassNames(
            "h-12x w-12x rounded-full border border-black",
            dir === "positiveToNegative" ? "bg-black" : "bg-white",
          )}
        />
        <span
          className={mergeClassNames(
            "h-12x w-12x rounded-full border border-black",
            dir === "negativeToPositive" ? "bg-black" : "bg-white",
          )}
        />
      </div>
    </div>
  )
}
