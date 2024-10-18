
type PendingTasksResponse = {
    id: string;
    title: string;
    desiredWeeklyFrequency: number;
    completionCount: number;
}[]


export async function getPendingTasks(): Promise<PendingTasksResponse> {
  const response = await fetch('https://to-do-list-0owk.onrender.com/pending-tasks')
  const data = await response.json()

  return data.pendingTasks
}
