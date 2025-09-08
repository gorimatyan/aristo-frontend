/**
 * スクリーンサイズ
 */
export const SCREENS = {
  min: 320,
  base: 390,
  max: 430,
}

/**
 * ブレイクポイントのスクリーンサイズ
 */
export const BREAK_POINT_SCREENS = {
  iphonese: 325,
  xs: 480,
  smaponsive: 501,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

type Transition = {
  durationSeconds: number
  timingFunction: Exclude<
    React.CSSProperties["transitionTimingFunction"],
    undefined
  >
}

/**
 * トランジション設定
 */
export const TRANSITIONS = {
  base: {
    durationSeconds: 0.15,
    timingFunction: "ease-in-out",
  },
} as const satisfies Record<string, Transition>
