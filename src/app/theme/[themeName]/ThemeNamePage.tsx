"use client"
import BackgroundLayout from "@/features/layout/components/BackgroundLayout"
import { CharacterSpeech } from "@/features/characterSpeech/CharacterSpeech"
import { PositiveNegativeButton } from "@/features/button/PositiveNegativeButton"
import Image from "next/image"
import { useState } from "react"
import { GradientButton } from "@/features/button/GradientButton"

export const ThemeNamePage = () => {
  const positive = [
    "デジタル社会に必須の基礎リテラシーを早期に身につけられる",
    "論理的思考力の育成につながる",
    "早く始めることで興味関心の幅が広がる",
  ]
  const negative = [
    "国語や算数など基礎科目がおろそかになる懸念",
    "教師の指導力やカリキュラム整備が追いついていない",
    "IT機器格差（家庭環境の違い）による不平等が広がる",
  ]

  const [selected, setSelected] = useState<"none" | "positive" | "negative">(
    "none",
  )
  const handleSelect = (type: "none" | "positive" | "negative") => {
    // 再度同じボタンを押したらnoneにする
    setSelected((prev) => (prev === type ? "none" : type))
  }

  const characterSpeechText = (winRate: number) => {
    if (selected === "none") {
      return "肯定側か否定側<br />どちらを選ぶのじゃ？"
    } else if (selected === "positive") {
      return `肯定側の平均勝率は<span class="text-red-500 font-bold">${100 - winRate}%</span>なのじゃ<br />勝つことができれば<br />君の論理力は本物じゃ`
    } else {
      return `否定側の平均勝率は<span class="text-red-500 font-bold">${winRate}%</span>なのじゃ<br />勝てば奇跡、負けても誇り<br />それがこの道じゃ`
    }
  }

  return (
    <BackgroundLayout backgroundImageSrc="/assets/images/debate/u7544387239_a_black_and_white_photograph_of_the_72_hexen_stoc_d4e4e37e-bfea-4797-ba2a-41b76a3dfa3b_1.png">
      <div className="pb-200x text-center text-white">
        <div className="flex flex-col items-center justify-center gap-8x py-32x">
          <Image
            src="/assets/images/theme/book.png"
            alt="theme"
            width={100}
            height={100}
            className="size-64x"
          />
          <span className="text-22x font-bold">教育</span>
          <span className="text-18x font-bold">
            小学校からのプログラミング教育は必要か
          </span>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-8x px-16x">
          <PositiveNegativeButton
            className="h-240x w-full"
            onClick={() => handleSelect("positive")}
            buttonType="positive"
            selected={selected === "positive"}
          >
            <ul className="flex flex-col items-start gap-6x p-12x text-start text-15x font-bold leading-[1.4]">
              {positive.map((item) => (
                <li key={item} className="flex items-start gap-8x">
                  <Image
                    src="/assets/images/memo/pen.png"
                    alt="negative"
                    width={100}
                    height={100}
                    className="mt-7x size-14x"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PositiveNegativeButton>
          <PositiveNegativeButton
            className="h-240x w-full"
            onClick={() => handleSelect("negative")}
            buttonType="negative"
            selected={selected === "negative"}
          >
            <ul className="flex flex-col items-start gap-6x p-12x text-start text-15x font-bold leading-[1.4]">
              {negative.map((item) => (
                <li key={item} className="flex items-start gap-8x">
                  <Image
                    src="/assets/images/memo/pen.png"
                    alt="negative"
                    width={100}
                    height={100}
                    className="mt-7x size-14x"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PositiveNegativeButton>
        </div>

        <GradientButton
          className="!mt-32x !py-16x text-20x"
          item="マッチング開始"
          onClick={() => {}}
        />
      </div>
      <CharacterSpeech
        videoSrc="/assets/videos/aristotle/he_mans_facial_express_2.mp4"
        name="アリストテレス"
        text={characterSpeechText(33)}
      />
    </BackgroundLayout>
  )
}
