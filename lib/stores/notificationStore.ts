import { create } from 'zustand'
import { NotificationType } from '../types'

type NotificationStore = {
  notifications: NotificationType[]
  fetchNotifications: () => Promise<void>
  markAllAsRead: () => Promise<void>
  unreadCount: number
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  fetchNotifications: async () => {
    try {
      const res = await fetch('/api/notifications')
      const data: NotificationType[] = await res.json()
      set({
        notifications: data,
        unreadCount: data.filter((n) => !n.isRead).length,
      })
    } catch (error) {
      console.error('fetchNotifications error:', error)
    }
  },

  markAllAsRead: async () => {
    try {
      await fetch('/api/notifications/mark-as-read', { method: 'POST' })
      await get().fetchNotifications()
    } catch (error) {
      console.error('markAllAsRead error:', error)
    }
  },
}))
