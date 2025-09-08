import type { SVGProps } from "react"

import { mergeClassNames } from "@/features/style/classnames"

export type ArrowGradientGbIconProps = SVGProps<SVGSVGElement>

export const ArrowGradientGbIcon: React.FC<ArrowGradientGbIconProps> = ({
  className,
  ...props
}) => {
  const gradientId = "arrow-gb-gradient"
  return (
    <svg
      className={mergeClassNames(className)}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="37.634"
      height="18.499"
      viewBox="0 0 37.634 18.499"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#84b7ff" />
          <stop offset="1" stopColor="#117628" />
        </linearGradient>
      </defs>
      <path
        d="M23.783,43.261V68.625a1.008,1.008,0,0,0,1.008,1.008h4.7A1.008,1.008,0,0,0,30.5,68.625V43.261h3.869A2.016,2.016,0,0,0,35.8,39.819L28.569,32.59a2.016,2.016,0,0,0-2.851,0l-7.229,7.229a2.016,2.016,0,0,0,1.426,3.442Z"
        transform="translate(69.633 -17.894) rotate(90)"
        fill={`url(#${gradientId})`}
      />
    </svg>
  )
}
