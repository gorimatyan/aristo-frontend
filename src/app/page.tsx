import { ArrowGradientBgIcon } from "@/features/icons/components/ArrowGradientBgIcon"
import { ArrowGradientGbIcon } from "@/features/icons/components/ArrowGradientGbIcon"
import { CrossIcon } from "@/features/icons/components/CrossIcon"
import { MicOffIcon } from "@/features/icons/components/MicOffIcon"
import { MicOnIcon } from "@/features/icons/components/MicOnIcon"
import { TriangleIcon } from "@/features/icons/components/TriangleIcon"

export default function Home() {
  return (
    <div className="">
      <CrossIcon />
      <TriangleIcon className="h-2.5x w-3.5 fill-white" />
      <ArrowGradientGbIcon className="h-[18.5px] w-[38px]" />
      <ArrowGradientBgIcon className="h-[18.5px] w-[38px]" />
      <MicOffIcon className="h-[72px] w-[90px] text-white" />
      <MicOnIcon className="h-[72px] w-[49.5px] fill-red-500" />
    </div>
  )
}
