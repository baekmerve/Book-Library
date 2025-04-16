"use client"
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

interface Props {
  route: string
  text: string
}

const NavButton = ({ route, text }: Props) => {
    const pathname = usePathname()
    const isActive = pathname === route
  return (
    <Button
      asChild
      className={`font-bebas text-2xl tracking-widest bg-transparent shadow-none hover:bg-transparent transition-all duration-300 ease-in-out text-primary ${
        isActive
          ? ' underline underline-offset-8 decoration-2 decoration-soft-pink '
          : ' hover:text-soft-pink hover:scale-105'
      }`}
    >
      <Link href={route}>{text}</Link>
    </Button>
  )
}

export default NavButton
