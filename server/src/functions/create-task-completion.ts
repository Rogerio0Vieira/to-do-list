import { and, count, eq, gte, lte, sql } from "drizzle-orm"
import { db } from "../db"
import { taskCompletions, tasks } from "../db/schema"
import dayjs from "dayjs"

interface CreateTaskCompletionRequest {
  taskId: string
}

const firstDayOfWeek = dayjs().startOf('week').toDate()
const lastDayOfWeek = dayjs().endOf('week').toDate()


export async function createTaskCompletion({
  taskId
}: CreateTaskCompletionRequest) {

  const taskCompletionCounts = db.$with('task_completion_counts').as(
    db
      .select({
        taskId: taskCompletions.taskId,
        completionCount: count(taskCompletions.id).as('completionCount'),
      })
      .from(taskCompletions)
      .where(
        and(
          gte(taskCompletions.created_at, firstDayOfWeek),
          lte(taskCompletions.created_at, lastDayOfWeek),
          eq(taskCompletions.taskId, taskId)
        )
      )
      .groupBy(taskCompletions.taskId)
  )

  const result = await db
    .with(taskCompletionCounts)
    .select({
      desiredWeeklyFrequency: tasks.desiredWeeklyFrequency,
      completionCount: sql`
        COALESCE(${taskCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(tasks)
    .leftJoin(taskCompletionCounts, eq(taskCompletionCounts.taskId, tasks.id))
    .where(eq(tasks.id, taskId))
    .limit(1)

  if (!result[0]) {
    throw new Error('task not found')
  }

  const { completionCount, desiredWeeklyFrequency } = result[0]

  if (completionCount >= desiredWeeklyFrequency) {
    throw new Error('Task already completed this week!')
  }

  const [taskCompletion] = await db
    .insert(taskCompletions)
    .values({ taskId })
    .returning()

  return { taskCompletion }
}
