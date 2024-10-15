type SummaryResponse = {
  completed: number;
  total: number;
  tasksPerDay: Record<string, {
      id: string;
      title: string;
      completedAt: string;
  }[]>;
}


export async function getSummary(): Promise<SummaryResponse> {
  const response = await fetch('https://to-do-list-0owk.onrender.com/summary')
  const data = await response.json()

  return data.summary
}
