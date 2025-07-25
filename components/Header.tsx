import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { navLinks } from '@/app/constants '
import NavButton from './NavButton'
import NotificationBell from './notification/NotificationBell'

const Header = async () => {
  return (
    <header className='fixed top-0 left-0 z-50 w-full pt-5 lg:pt-10 pb-5 transition-all duration-300 bg-black/30 backdrop-blur-lg border-b border-white/10'>
      <div className='flex flex-col mx-auto items-center  lg:flex-row max-w-[90%] justify-between gap-5 '>
        <Link href='/' className='flex text-white items-center gap-2'>
          <BookOpen className='size-10 ' />
          <h1 className='font-poetsen text-2xl sm:text-3xl '>Book Library</h1>
        </Link>
        <div className='flex items-center md:gap-5    '>
          {navLinks.map((link) => (
            <NavButton key={link.route} {...link} />
          ))}
          <NotificationBell />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}

export default Header
