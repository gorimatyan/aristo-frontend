import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ジャンルを選択",
  description: "ジャンルを選択",
}

export default function GenreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
