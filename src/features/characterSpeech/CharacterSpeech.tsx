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
      style={{
        background:
          "linear-gradient(to top, rgba(0, 0, 0, 0.9) 70%, transparent)",
      }}
      className={mergeClassNames(
        "fixed bottom-0 left-0 right-0 z-50 flex min-h-90x flex-col items-center justify-center gap-8x p-16x text-white",
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
            className="h-36x w-36x rounded-full"
          />
        </div>

        {/* キャラ名 */}
        <div>
          <div className="text-16x font-bold">{name}</div>
        </div>
      </div>

      <div className="py-8x text-center text-18x font-bold">
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  )
}
