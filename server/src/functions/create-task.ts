import { db } from "../db"
import { tasks } from "../db/schema"

interface CreateTaskRequest {
  title: string
  description: string | null,
  priority: string | null,
  status: boolean
}


export async function createTask({title, description, priority, status}: CreateTaskRequest ){
  const result = await db.insert(tasks).values({
    title,
    description,
    priority,
    status
  }).returning()

  const task = result[0]

  return {
    task,
  }
}
