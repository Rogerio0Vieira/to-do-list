import dayjs from "dayjs"
import { client, db } from "."
import { taskCompletions, tasks } from "./schema"

async function seed() {
  await db.delete(taskCompletions)
  await db.delete(tasks)

  const result = await db.insert(tasks).values([
    { title: 'exercise algorithm skills',
      description: 'Solve problems using data structures and algorithms',
      desiredWeeklyFrequency: 1
    },
    { title: 'build a portfolio',
      description: 'Create projects to showcase on a personal portfolio website',
      desiredWeeklyFrequency: 1
     },
    { title: 'learn testing in javascript',
      description: 'Study unit and integration testing with Jest',
      desiredWeeklyFrequency: 1
    },
    {
      title: 'study system design',
      description: 'Learn about designing scalable systems and architecture patterns',
      desiredWeeklyFrequency: 2
    },
    {
      title: 'practice problem-solving',
      description: 'Solve coding challenges on platforms like LeetCode or HackerRank',
      desiredWeeklyFrequency: 3
    },
    {
      title: 'read software engineering books',
      description: 'Read a chapter from a book on software development or engineering',
      desiredWeeklyFrequency: 1
    },
    {
      title: 'contribute to open source',
      description: 'Find and contribute to open-source projects related to your stack',
      desiredWeeklyFrequency: 2
    },
    {
      title: 'explore new frameworks',
      description: 'Experiment with a new JavaScript or backend framework',
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
