import { and, count, desc, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { taskCompletions, tasks } from '../db/schema'
import dayjs from 'dayjs'

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const tasksCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: tasks.id,
        title: tasks.title,
        desiredWeeklyFrequency: tasks.desiredWeeklyFrequency,
        createdAt: tasks.created_at,
      })
      .from(tasks)
      .where(lte(tasks.created_at, lastDayOfWeek))
  )

  const taskscompletedInWeek = db.$with('goals_completed_in_week').as(
    db
      .select({
        id: taskCompletions.id,
        title: tasks.title,
        completedAt: taskCompletions.created_at,
        completedAtDate: sql`
          DATE(${taskCompletions.created_at})
        `.as('completedAtDate'),
      })
      .from(taskCompletions)
      .innerJoin(tasks, eq(tasks.id, taskCompletions.taskId))
      .where(
        and(
          gte(taskCompletions.created_at, firstDayOfWeek),
          lte(taskCompletions.created_at, lastDayOfWeek)
        )
      )
  )

  const tasksCompletedByWeekDay = db.$with('tasks_completed_by_week_day').as(
    db
      .select({
        completedAtDate: taskscompletedInWeek.completedAtDate,
        completions: sql`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ${taskscompletedInWeek.id},
              'title', ${taskscompletedInWeek.title},
              'completedAt', ${taskscompletedInWeek.completedAt}
            )
          )
        `.as('completions'),
      })
      .from(taskscompletedInWeek)
      .groupBy(taskscompletedInWeek.completedAtDate)
      .orderBy(desc(taskscompletedInWeek.completedAtDate))
  )

  type TasksPerDay = Record<string, {
    id: string;
    title: string;
    completedAt: string
  }[]>

  const result = await db
    .with(tasksCreatedUpToWeek, taskscompletedInWeek, tasksCompletedByWeekDay)
    .select({
      completed: sql`(SELECT COUNT(*) FROM ${taskscompletedInWeek})`.mapWith(
        Number
      ),
      total:
        sql`(SELECT SUM(${tasks.desiredWeeklyFrequency}) FROM ${tasksCreatedUpToWeek})`.mapWith(
          Number
        ),
      tasksPerDay: sql<TasksPerDay>`
        JSON_OBJECT_AGG(
          ${tasksCompletedByWeekDay.completedAtDate},
          ${tasksCompletedByWeekDay.completions}
        )
      `,
    })
    .from(tasksCompletedByWeekDay)

  return {
    summary: result[0],
  }
}
