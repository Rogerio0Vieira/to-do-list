import {pgTable, text, integer, timestamp} from "drizzle-orm/pg-core"


export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('pending'),
  created_at: timestamp('created_at', {withTimezone: true}).notNull().defaultNow(),
  updated_at: timestamp('updated_at', {withTimezone: true}).notNull().defaultNow(),
  completed_at: timestamp('completed_at'),
  priority: text('priority').default('low'),
})
