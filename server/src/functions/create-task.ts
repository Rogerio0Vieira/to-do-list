import { db } from "../db"
import { tasks } from "../db/schema"

interface CreateTaskRequest {
  title: string
  description: string | null
}


export async function createTask({title, description}: CreateTaskRequest ){
  const result = await db.insert(tasks).values({
    title,
    description
  }).returning()

  const task = result[0]

  return {
    task,
  }
}
