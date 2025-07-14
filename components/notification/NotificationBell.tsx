'use client'

import { useEffect, useRef, useState } from 'react'
import NotificationDropdown from './NotificationDropdown'
import { Button } from '../ui/button'
import { useNotificationStore } from '@/lib/stores/notificationStore'

export default function NotificationBell() {
  const { notifications, fetchNotifications, markAllAsRead, unreadCount } =
    useNotificationStore()
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleToggleDropdown = async () => {
    const willOpen = !isOpen
    setIsOpen(willOpen)

    if (willOpen) {
      //bring the niotifications
      await fetchNotifications()

      //wait until user see new notifications
      setTimeout(async () => {
        await markAllAsRead()
      }, 500)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='relative' ref={wrapperRef}>
      <Button
        onClick={handleToggleDropdown}
        className='relative p-2 bg-transparent hover:bg-transparent cursor-pointer text-primary hover:text-soft-pink hover:scale-105 text-base md:text-xl font-poetsen '
      >
        Notifications
        {unreadCount > 0 && (
          <span className='absolute -top-1 -right-1.5 w-4 h-4 text-xs bg-soft-pink text-white flex items-center justify-center rounded-full'>
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className='absolute right-0 mt-2 z-50 w-[350px]'>
          <NotificationDropdown notifications={notifications} />
        </div>
      )}
    </div>
  )
}
