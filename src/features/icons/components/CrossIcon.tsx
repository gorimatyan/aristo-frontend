import type { SVGProps } from "react"

import { mergeClassNames } from "@/features/style/classnames"

export type CrossIconProps = SVGProps<SVGSVGElement>

export const CrossIcon: React.FC<CrossIconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={mergeClassNames("fill-white", className)}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M16.549,92l6.823-6.823a2.145,2.145,0,0,0,0-3.033l-1.516-1.516a2.145,2.145,0,0,0-3.033,0L12,87.451,5.177,80.628a2.145,2.145,0,0,0-3.033,0L.628,82.144a2.145,2.145,0,0,0,0,3.033L7.451,92,.628,98.823a2.145,2.145,0,0,0,0,3.033l1.516,1.516a2.145,2.145,0,0,0,3.033,0L12,96.549l6.823,6.823a2.145,2.145,0,0,0,3.033,0l1.516-1.516a2.145,2.145,0,0,0,0-3.033Z"
        transform="translate(0 -80)"
      />
    </svg>
  )
}
