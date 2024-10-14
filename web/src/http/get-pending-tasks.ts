
type PendingTasksResponse = {
    id: string;
    title: string;
    desiredWeeklyFrequency: number;
    completionCount: number;
}[]


export async function getPendingTasks(): Promise<PendingTasksResponse> {
  const response = await fetch('http://localhost:3333/pending-tasks')
  const data = await response.json()

  return data.pendingTasks
}
