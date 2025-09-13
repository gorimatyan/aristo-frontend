import Image from "next/image"
import { AccordionHeader } from "@/features/header/components/AccordionHeader"
import type { ComponentProps } from "react"
import { mergeClassNames } from "@/features/style/classnames"

type MatchingLayoutProps = ComponentProps<"div"> & {
  backgroundImageSrc?: string
  titleContent: React.ReactNode
}

export const MatchingLayout: React.FC<MatchingLayoutProps> = ({
  backgroundImageSrc,
  titleContent,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={mergeClassNames("relative min-h-dvh w-full pt-32x", className)}
      {...props}
    >
      <AccordionHeader className="h-32x" titleContent={titleContent} />
      {backgroundImageSrc && (
        <Image
          src={backgroundImageSrc}
          alt="background"
          fill
          priority
          className="-z-10 object-cover opacity-15 blur-[4px]"
        />
      )}
      {children}
    </div>
  )
}
