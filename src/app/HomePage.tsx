"use client"
import Image from "next/image"
import { GradientButton } from "@/features/button/GradientButton"
import { forte } from "../../styles/fonts"
import { useRouter } from "next/navigation"
import BackgroundLayout from "@/features/layout/components/BackgroundLayout"

export const HomePage = () => {
  const router = useRouter()
  return (
    <BackgroundLayout backgroundImageSrc="/assets/images/debate/u7544387239_a_black_and_white_photograph_of_the_72_hexen_stoc_d4e4e37e-bfea-4797-ba2a-41b76a3dfa3b_1.png">
      {/* コンテンツ */}
      <div className="relative z-10 flex flex-col items-center bg-white/10 py-24x shadow-[inset_0_0_8px_rgba(0,0,0,0.5)] backdrop-blur-[6px]">
        {/* ロゴ */}
        <div className="flex flex-col items-center">
          <Image
            src="/assets/images/human/aristotle/S__104882180-removebg-preview (3).png"
            alt="aristotle"
            width={160}
            height={120}
            className="h-200x object-contain opacity-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          />
          <h1
            className={`${forte.className} relative -mt-64x text-80x font-bold tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}
          >
            Aristo
          </h1>
        </div>
      </div>

      {/* メニュー */}
      <ul className="mt-64x flex w-full max-w-500x flex-col items-stretch gap-12x">
        {[
          { label: "プレイ", onClick: () => router.push("/theme") },
          { label: "スピーチジム", onClick: () => {} },
          { label: "観戦", onClick: () => {} },
          { label: "設定", onClick: () => {} },
        ].map((item) => (
          <li key={item.label}>
            <GradientButton
              className="w-full py-14x text-20x"
              item={item.label}
              onClick={item.onClick}
            />
          </li>
        ))}
      </ul>
    </BackgroundLayout>
  )
}
