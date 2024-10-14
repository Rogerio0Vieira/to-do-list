import { Dialog } from './components/ui/dialog';
import { CreateTask } from "./components/create-task";
import { Summary } from './components/summary';
import { useQuery } from '@tanstack/react-query';
import { EmptyTasks } from './components/empty-tasks';
import { getSummary } from './http/get-summary';




export function App() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })


  return (
    <Dialog >
      {data?.total && data.total > 0 ? <Summary /> : <EmptyTasks />}

      <CreateTask />
    </Dialog>

  )
}


