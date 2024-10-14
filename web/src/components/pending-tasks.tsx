import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { getPendingTasks } from '../http/get-pending-tasks'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createGoalCompletion } from '../http/create-task-completion'



export function PendingTasks() {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['pending-tasks'],
    queryFn: getPendingTasks,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return null
  }

  async function handleCompleteTask(taskId: string) {
    await createGoalCompletion(taskId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-tasks'] })
  }


  return (
    <div className="flex flex-wrap gap-3">
      {data.map(task => {
        return (
          <OutlineButton
            key={task.id}
            disabled={task.completionCount >= task.desiredWeeklyFrequency}
            title='Complete task'
            onClick={()=>handleCompleteTask(task.id)}
          >
            <Plus className="size-4 text-teal-600" />
            {task.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}



