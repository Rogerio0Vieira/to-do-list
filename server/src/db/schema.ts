import {pgTable, text, boolean, timestamp} from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { integer } from "drizzle-orm/pg-core"


export const tasks = pgTable('tasks', {
  id: text('id').primaryKey().$defaultFn(()=>createId()),
  title: text('title').notNull(),
  created_at: timestamp('created_at', {withTimezone: true}).notNull().defaultNow(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
})

export const taskCompletions = pgTable('task_completions', {
  id: text('id').primaryKey().$defaultFn(()=>createId()),
  taskId: text('task_id').references(() => tasks.id).notNull(),
  created_at: timestamp('created_at', {withTimezone: true}).notNull().defaultNow(),
})
