import { getViewportSize, transformSmaponsiveSizeProperty } from "./responsive"

type Params = {
  /**
   * スクリーンサイズ
   */
  viewSizes: Parameters<typeof transformSmaponsiveSizeProperty>[1]
  /**
   * 上限値
   */
  max: number
  /**
   * スマポンシブ用の可変サイズの単位
   *
   * @default x
   */
  smaponsiveUnit?: string
  /**
   * レスポンシブ用の可変サイズの単位
   *
   * @default sp
   */
  responsiveUnit?: string
}

export const getSpacing = (params: Params) => {
  const { max, smaponsiveUnit = "x", responsiveUnit = "sp", viewSizes } = params

  type Result = Record<string, string>

  return [...new Array(max)].reduce<Result>((result, _, index) => {
    const currentIndex = index + 1
    return {
      ...result,
      // `〇〇px`の形式で指定
      [`${currentIndex}px`]: `${currentIndex}px`,
      // カスタム単位（x）を追加
      [`${currentIndex}${smaponsiveUnit}`]: transformSmaponsiveSizeProperty(
        currentIndex,
        viewSizes,
      ),
      [`${currentIndex}${responsiveUnit}`]:
        getViewportSize(currentIndex, viewSizes.base) + "vw",
    }
  }, {} as Result)
}
