import type { SVGProps } from "react"

import { mergeClassNames } from "@/features/style/classnames"

export type MicOnIconProps = SVGProps<SVGSVGElement>

export const MicOnIcon: React.FC<MicOnIconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={mergeClassNames("fill-[#ff4747]", className)}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="49.5"
      height="72"
      viewBox="0 0 49.5 72"
    >
      <path d="M47.25,27H45a2.249,2.249,0,0,0-2.25,2.25V36a18.021,18.021,0,0,1-19.8,17.913C13.6,53,6.75,44.594,6.75,35.2V29.25A2.249,2.249,0,0,0,4.5,27H2.25A2.249,2.249,0,0,0,0,29.25V34.9C0,47.5,9,58.74,21.375,60.448v4.8H13.5a2.249,2.249,0,0,0-2.25,2.25v2.25A2.249,2.249,0,0,0,13.5,72H36a2.249,2.249,0,0,0,2.25-2.25V67.5A2.249,2.249,0,0,0,36,65.25H28.125V60.5A24.774,24.774,0,0,0,49.5,36V29.25A2.249,2.249,0,0,0,47.25,27ZM24.75,49.5A13.5,13.5,0,0,0,38.25,36h-12c-.828,0-1.5-.5-1.5-1.125v-2.25c0-.622.672-1.125,1.5-1.125h12V27h-12c-.828,0-1.5-.5-1.5-1.125v-2.25c0-.622.672-1.125,1.5-1.125h12V18h-12c-.828,0-1.5-.5-1.5-1.125v-2.25c0-.622.672-1.125,1.5-1.125h12a13.5,13.5,0,1,0-27,0V36A13.5,13.5,0,0,0,24.75,49.5Z" />
    </svg>
  )
}
