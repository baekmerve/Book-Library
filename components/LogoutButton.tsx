'use client'

import { LogOutIcon } from 'lucide-react'
import { Button } from './ui/button'
import { logout } from '@/lib/actions/auth-actions'

const LogoutButton = () => {
  return (
    <Button
      onClick={() => logout()}
      className=' text-base md:text-xl font-poetsen  cursor-pointer bg-transparent shadow-none hover:bg-transparent transition-all hover:scale-105 duration-300 ease-in-out text-primary hover:text-soft-pink'
    >
      Logout
      <LogOutIcon className='text-soft-pink weight-6 size-6' />
    </Button>
  )
}

export default LogoutButton
