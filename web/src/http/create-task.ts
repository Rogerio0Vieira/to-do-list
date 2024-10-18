interface CreateTaskRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createTask({
  title,
  desiredWeeklyFrequency,
}: CreateTaskRequest) {
  await fetch('https://to-do-list-0owk.onrender.com/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  })
}
