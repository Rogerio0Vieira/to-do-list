import { Dialog } from './components/ui/dialog';
import { CreateTask } from "./components/create-task";
import { Summary } from './components/summry';
// import { EmptyTasks } from './components/empty-tasks';


export function App() {
  return (
    <Dialog >
      {/* <EmptyTasks/> */}
      <Summary/>
      <CreateTask />
    </Dialog>

  )
}


