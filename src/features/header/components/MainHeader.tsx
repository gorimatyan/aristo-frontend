export const MainHeader = ({
  userName,
  rightSide,
}: {
  userName: string
  rightSide: React.ReactNode
}) => {
  return (
    <header className="relative flex h-48x items-center justify-between bg-gradient-to-b from-[#353535] to-black px-8x text-16x">
      <div className="text-white">{userName}</div>
      <div>{rightSide}</div>
    </header>
  )
}
