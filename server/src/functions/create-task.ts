import { db } from "../db"
import { tasks } from "../db/schema"

interface CreateTaskRequest {
  title: string
  description: string | null,
  priority: string | null,
  status: boolean
  desiredWeeklyFrequency: number
}

export async function createTask({title, description, priority, status, desiredWeeklyFrequency}: CreateTaskRequest ){
  const task = await db
    .insert(tasks)
    .values({ title, description, priority, status, desiredWeeklyFrequency })
    .returning()

  return {
    task,
  }
}
