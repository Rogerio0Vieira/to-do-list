import { db } from "../db"
import { tasks } from "../db/schema"

interface CreateTaskRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createTask({title, desiredWeeklyFrequency}: CreateTaskRequest ){
  const task = await db
    .insert(tasks)
    .values({ title, desiredWeeklyFrequency })
    .returning()

  return {
    task,
  }
}
