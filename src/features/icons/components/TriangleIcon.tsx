import type { SVGProps } from "react"

import { mergeClassNames } from "@/features/style/classnames"

export type TriangleIconProps = SVGProps<SVGSVGElement>

export const TriangleIcon: React.FC<TriangleIconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={mergeClassNames("fill-white", className)}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="10"
      viewBox="0 0 14 10"
    >
      <path d="M7,0l7,10H0Z" />
    </svg>
  )
}
