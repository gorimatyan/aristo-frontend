/**
 * Tailwind CSSの`screens`に設定できる値を取得
 */
export const getScreenSizes = (tokens: Record<string, number>) => {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => {
      return [key, `${value}px`]
    }),
  )
}
