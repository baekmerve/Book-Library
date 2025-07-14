'use client'

import { NotificationType } from '@/lib/types'

export default function NotificationDropdown({
  notifications,
}: {
  notifications: NotificationType[]
}) {
  return (
    <div className='w-full max-h-96 overflow-y-auto  shadow-lg border rounded-md p-4 bg-zinc-100'>
      {notifications.length === 0 ? (
        <p className='text-gray-500 text-sm text-center'>
          There is no notification
        </p>
      ) : (
        <ul className='space-y-2 text-sm mt-2'>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`border-b pb-2 p-2 border border-gray-300 space-y-1 rounded-md transition-colors duration-300 ${
                notification.isRead ? 'bg-white' : 'bg-gray-200'
              }`}
            >
              <p className='text-xs text-gray-700'>
                {new Date(notification.createdAt).toLocaleString()}
              </p>
              <p className={`${
                notification.isRead ? 'text-gray-700' : 'text-gray-900 font-medium'}`}
          
              >{notification.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
