interface CreateTaskRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createTask({
  title,
  desiredWeeklyFrequency,
}: CreateTaskRequest) {
  await fetch('http://localhost:3333/tasks', {
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
