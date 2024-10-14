import dayjs from "dayjs"
import { client, db } from "."
import { taskCompletions, tasks } from "./schema"

async function seed() {
  await db.delete(taskCompletions)
  await db.delete(tasks)

  const result = await db.insert(tasks).values([
    { title: 'exercise algorithm skills',
      desiredWeeklyFrequency: 1
    },
    { title: 'build a portfolio',
      desiredWeeklyFrequency: 1
     },
    { title: 'learn testing in javascript',
      desiredWeeklyFrequency: 1
    },
    {
      title: 'study system design',
      desiredWeeklyFrequency: 2
    },
    {
      title: 'practice problem-solving',
      desiredWeeklyFrequency: 3
    },
    {
      title: 'read software engineering books',
      desiredWeeklyFrequency: 1
    },
    {
      title: 'contribute to open source',
      desiredWeeklyFrequency: 2
    },
    {
      title: 'explore new frameworks',
      desiredWeeklyFrequency: 1
    }
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
