"use client"
import BackgroundLayout from "@/features/layout/components/BackgroundLayout"
import Image from "next/image"
import { GradientButton } from "@/features/button/GradientButton"
import { CharacterSpeech } from "@/features/characterSpeech/CharacterSpeech"
import { useRouter } from "next/navigation"

export const ThemeSelectPage = () => {
  const router = useRouter()
  return (
    <BackgroundLayout backgroundImageSrc="/assets/images/debate/u7544387239_a_black_and_white_photograph_of_the_72_hexen_stoc_d4e4e37e-bfea-4797-ba2a-41b76a3dfa3b_1.png">
      <div className="h-[60dvh] text-center text-white">
        <div className="flex h-full flex-col justify-center gap-16x">
          <div className="my-32x flex items-center justify-center">
            <h2 className="text-20x font-bold">今週のテーマ</h2>
          </div>

          {/* テーマ一覧 */}
          {[
            {
              theme: "教育",
              label: "小学校からのプログラミング教育は必要か",
              icon: "/assets/images/theme/book.png",
              onClick: () => router.push("/theme/education"),
            },
            {
              theme: "政治",
              label: "外国人に参政権を認めるべき",
              icon: "/assets/images/theme/politics.png",
              onClick: () => router.push("/theme/politics"),
            },
            {
              theme: "外交",
              label: "移民の受け入れは中止するべき",
              icon: "/assets/images/theme/world peace.png",
              onClick: () => router.push("/theme/diplomacy"),
            },
          ].map((item) => (
            <div key={item.label} className="flex items-center">
              <GradientButton
                className="px-32x py-24x"
                item={
                  <div className="flex items-center">
                    <div className="mr-24x flex flex-col items-center gap-4x">
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={32}
                        height={32}
                        className="size-42x"
                      />
                      <span className="text-12x font-bold">{item.theme}</span>
                    </div>
                    <span className="text-left text-16x font-bold">
                      {item.label}
                    </span>
                  </div>
                }
                onClick={item.onClick}
              />
            </div>
          ))}
        </div>
      </div>
      <CharacterSpeech
        className="absolute bottom-0 left-0 right-0"
        videoSrc="/assets/videos/aristotle/he_mans_facial_express_2.mp4"
        name="アリストテレス"
        text="テーマを選ぶのじゃ。"
      />
    </BackgroundLayout>
  )
}
