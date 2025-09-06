type ViewSizes = {
  base: number
  min: number
  max: number
}

/**
 * 基準のビューポートをもとにサイズを算出する関数
 */
export const getViewportSize = (value: number, baseViewport: number) => {
  return (value / baseViewport) * 100
}

/**
 * スマポンシブ用の可変サイズプロパティに変換する関数
 */
export const transformSmaponsiveSizeProperty = (
  value: number,
  viewSizes: ViewSizes,
) => {
  const isValidOrderSizes =
    viewSizes.min < viewSizes.base && viewSizes.base < viewSizes.max
  if (!isValidOrderSizes) {
    throw Error(
      `Invalid ViewSizes. Should set min, base and max to be larger in that order`,
    )
  }
  const base = getViewportSize(value, viewSizes.base) + "vw"
  const min = (viewSizes.min / viewSizes.base) * value + "px"
  const max = (viewSizes.max / viewSizes.base) * value + "px"
  return `clamp(${min}, ${base}, ${max})`
}
