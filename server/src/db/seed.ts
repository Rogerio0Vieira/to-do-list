import dayjs from "dayjs"
import { client, db } from "."
import { taskCompletions, tasks } from "./schema"

async function seed() {
  await db.delete(taskCompletions)
  await db.delete(tasks)

  const result = await db.insert(tasks).values([
    { title: 'exercise algorithm skills', description: 'Solve problems using data structures and algorithms' },
    { title: 'build a portfolio', description: 'Create projects to showcase on a personal portfolio website' },
    { title: 'learn testing in javascript', description: 'Study unit and integration testing with Jest' },
  ]).returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(taskCompletions).values([
    {taskId: result[0].id, created_at: new Date() },
    {taskId: result[1].id, created_at: startOfWeek.toDate() },
    {taskId: result[2].id, created_at: startOfWeek.add(1, 'day').toDate() }
  ])

}

seed().finally(()=>{
  client.end()
})
