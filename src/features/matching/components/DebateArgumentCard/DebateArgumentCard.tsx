"use client"

import { useState } from "react"
import { mergeClassNames } from "@/features/style/classnames"
import Image from "next/image"
import { TriangleIcon } from "@/features/icons/components/TriangleIcon"

type Side = "positive" | "negative"

type DebateArgumentCardProps = {
  title: string
  side: Side // 色分けのため
  summaries?: string[] // 箇条書き（要約）
  fullText?: string // 全文
  defaultOpen?: boolean // アコーディオンの初期状態（summaries && fullText の時のみ有効）
  className?: string
}

export const DebateArgumentCard: React.FC<DebateArgumentCardProps> = ({
  title,
  side,
  summaries,
  fullText,
  defaultOpen = false,
  className,
}) => {
  const canAccordion = Boolean(summaries && summaries.length > 0 && fullText)
  const [open, setOpen] = useState(canAccordion ? defaultOpen : true)

  const titleBg = side === "positive" ? "bg-[#3F69A7]" : "bg-[#117628]"

  return (
    <section className={mergeClassNames("text-white", className)}>
      {/* タイトル */}
      <div className="mb-6x">
        <span
          className={mergeClassNames(
            "inline-block rounded-4x px-8x py-4x text-14x font-extrabold text-white",
            titleBg,
          )}
        >
          {title}
        </span>
      </div>

      {/* 内容 */}
      {canAccordion ? (
        <div>
          {/* 要約（常に表示） */}
          <ul className="mb-8x list-none space-y-6x text-14x">
            {summaries!.map((s, idx) => (
              <li key={`${idx}-${s}`} className="flex items-start gap-8x">
                <Image
                  src="/assets/images/memo/pen.png"
                  alt="bullet"
                  width={100}
                  height={100}
                  className="mt-7x size-14x"
                />
                <span>{s}</span>
              </li>
            ))}
          </ul>

          {/* アコーディオン トグル（TriangleIcon 仕様に合わせてタップで開閉） */}
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="mx-auto mb-8x block rounded-full p-2x text-white"
          >
            <TriangleIcon
              className={mergeClassNames(
                "h-8x w-10x transition-transform duration-300 ease-out",
                open ? "rotate-180" : "rotate-0",
              )}
            />
          </button>

          {/* 全文（開いた時に表示） */}
          <div
            className={mergeClassNames(
              "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
              open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <p className="whitespace-pre-wrap text-14x leading-[1.6]">
              {fullText}
            </p>
          </div>
        </div>
      ) : (
        // アコーディオン無し：要約のみ or 全文のみをそのまま表示
        <div>
          {summaries && summaries.length > 0 ? (
            <ul className="list-none space-y-6x text-14x">
              {summaries.map((s, idx) => (
                <li key={`${idx}-${s}`} className="flex items-start gap-8x">
                  <Image
                    src="/assets/images/memo/pen.png"
                    alt="bullet"
                    width={100}
                    height={100}
                    className="mt-7x size-14x"
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {fullText ? (
            <p className="mt-8x whitespace-pre-wrap text-14x leading-[1.6]">
              {fullText}
            </p>
          ) : null}
        </div>
      )}
    </section>
  )
}
