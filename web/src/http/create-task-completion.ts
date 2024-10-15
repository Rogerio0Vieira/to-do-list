export async function createGoalCompletion(taskId: string) {
  await fetch('https://to-do-list-0owk.onrender.com/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      taskId,
    }),
  })
}
