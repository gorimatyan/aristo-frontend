import type { ComponentPropsWithRef } from "react"
import { mergeClassNames } from "../style/classnames"

type CharacterSpeechProps = ComponentPropsWithRef<"div"> & {
  videoSrc: string
  name: string
  text: string
  className?: string
}

export const CharacterSpeech: React.FC<CharacterSpeechProps> = ({
  videoSrc,
  name,
  text,
  className,
}) => {
  return (
    <div
      className={mergeClassNames(
        "flex min-h-100x flex-col items-center justify-center gap-8x bg-gradient-to-t from-black to-transparent p-16x text-white",
        className,
      )}
    >
      <div className="flex items-center gap-8x">
        {/* 顔 */}
        <div className="flex items-center justify-center rounded-full bg-white p-4x shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            className="h-48x w-48x rounded-full"
          />
        </div>

        {/* キャラ名 */}
        <div>
          <div className="font-bold">{name}</div>
        </div>
      </div>

      <div className="py-16x text-center text-18x font-bold">{text}</div>
    </div>
  )
}
