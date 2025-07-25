import {
  date,
  pgEnum,
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  varchar,
  numeric,
  boolean,
} from 'drizzle-orm/pg-core'

export const ROLE_ENUM = pgEnum('role', ['ADMIN', 'USER'])

export const BORROW_STATUS_ENUM = pgEnum('borrow_status', [
  'BORROWED',
  'RETURNED',
])

export const NOTIFICATION_TYPE_ENUM = pgEnum('notification_type', [
  'BORROWED',
  'RETURNED',
  'DUE_SOON',
  'EXPIRED',
])

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: ROLE_ENUM('role').default('USER').notNull(),
  lastActivityDate: date('last_acitivit_date').defaultNow().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const books = pgTable('books', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  genre: text('genre').notNull(),
  rating: numeric('rating', { precision: 2, scale: 1 }).notNull(),
  coverUrl: text('cover_url').notNull(),
  coverColor: varchar('cover_color', { length: 7 }).notNull(),
  description: text('description').notNull(),
  totalCopies: integer('total_copies').notNull().default(1),
  availableCopies: integer('availab_copies').notNull().default(0),
  summary: varchar('summary').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const borrowRecords = pgTable('borrow_records', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  bookId: uuid('book_id')
    .references(() => books.id)
    .notNull(),
  borrowDate: timestamp('borrow_date', { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date('due_date').notNull(),
  returnDate: date('return_date'),
  status: BORROW_STATUS_ENUM('status').default('BORROWED').notNull(),
})

export const notifications = pgTable('notifications', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  bookId: uuid('book_id')
    .references(() => books.id),
    //.notNull(),
  notificationType: NOTIFICATION_TYPE_ENUM('type').notNull(),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})