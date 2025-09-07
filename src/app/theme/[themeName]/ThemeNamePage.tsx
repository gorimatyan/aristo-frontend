"use client"
import BackgroundLayout from "@/features/layout/components/BackgroundLayout"
import { CharacterSpeech } from "@/features/characterSpeech/CharacterSpeech"
import { PositiveNegativeButton } from "@/features/button/PositiveNegativeButton"
import Image from "next/image"

export const ThemeNamePage = () => {
  return (
    <BackgroundLayout backgroundImageSrc="/assets/images/debate/u7544387239_a_black_and_white_photograph_of_the_72_hexen_stoc_d4e4e37e-bfea-4797-ba2a-41b76a3dfa3b_1.png">
      <div className="text-center text-white">
        <div className="my-32x flex items-center justify-center">
          <Image
            src="/assets/images/theme/book.png"
            alt="theme"
            width={100}
            height={100}
            className="size-64x"
          />
        </div>

        <div className="flex w-full items-center">
          <PositiveNegativeButton
            className="w-220x"
            onClick={() => {}}
            buttonType="positive"
          >
            <div>肯定</div>
          </PositiveNegativeButton>
          <PositiveNegativeButton
            className="w-220x"
            onClick={() => {}}
            buttonType="negative"
          >
            <div>否定</div>
          </PositiveNegativeButton>
        </div>
      </div>
      <CharacterSpeech
        className="absolute bottom-0 left-0 right-0"
        videoSrc="assets/videos/aristotle/he_mans_facial_express_2.mp4"
        name="アリストテレス"
        text="テーマを選ぶのじゃ。"
      />
    </BackgroundLayout>
  )
}
