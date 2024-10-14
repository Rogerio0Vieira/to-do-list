export async function createGoalCompletion(taskId: string) {
  await fetch('http://localhost:3333/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      taskId,
    }),
  })
}
