import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { db } from "../db";
import { taskCompletions, tasks } from "../db/schema";
import { and, lte, sql, count, gte, eq } from "drizzle-orm";


dayjs.extend(weekOfYear)


export async function getWeekPendingTasks(){
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()


  const tasksCreatedUpToWeek = db.$with('tasks_created_up_to_week').as(
    db.select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      created_at: tasks.created_at,
      status: tasks.status,
      priority: tasks.priority,
      desiredWeeklyFrequency: tasks.desiredWeeklyFrequency
    })
    .from(tasks)
    .where(lte(tasks.created_at, lastDayOfWeek))
  )


  const taskCompletionCounts = db.$with('tasks_completion_counts').as(
    db.select({
      taskId: taskCompletions.taskId,
      completionCount: count(taskCompletions.id).as('completionCount'),
    }).from(taskCompletions)
    .where(and(
      gte(taskCompletions.created_at, firstDayOfWeek),
      lte(taskCompletions.created_at, lastDayOfWeek)
    ))
    .groupBy(taskCompletions.taskId)
  )


  const pendingTasks = await db.with(tasksCreatedUpToWeek, taskCompletionCounts)
    .select({
      id: tasksCreatedUpToWeek.id,
      title: tasksCreatedUpToWeek.title,
      desiredWeeklyFrequency: tasksCreatedUpToWeek.desiredWeeklyFrequency,
      priority: tasksCreatedUpToWeek.priority,
      completionCount: sql`
       COALESCE(${taskCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(tasksCreatedUpToWeek)
    .leftJoin(
      taskCompletionCounts,
      eq(taskCompletionCounts.taskId, tasksCreatedUpToWeek.id )
    )

  return {
    pendingTasks,
  }

}
