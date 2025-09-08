import type { ReactNode } from "react"

type CenterStageLayoutProps = {
  children: ReactNode
}

export default function CenterStageLayout({
  children,
}: CenterStageLayoutProps) {
  return (
    <div className="grid min-h-dvh grid-cols-[1fr_minmax(0,500px)_1fr]">
      <div className="bg-black" />
      <main className="mx-auto min-h-dvh w-full max-w-[500px]">{children}</main>
      <div className="bg-black" />
    </div>
  )
}
