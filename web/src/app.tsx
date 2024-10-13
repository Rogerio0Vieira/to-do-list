import taskIcon from "./assets/tasks-svgrepo-com.svg"
import { Plus } from "lucide-react"

export function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={taskIcon} alt="task-icon" className="size-48" />
      <p className="text-teal-50 leading-relaxed max-w-80 text-center">
        You haven't registered any tasks, how about registering one right now?
      </p>

      <button type="button" className="px-4 py-2.5 rounded-lg bg-teal-500 flex items-center gap-2 text-sm font-medium tracking-tight hover:bg-teal-600" >
        <Plus className="size-4"/>
        Register task
      </button>
    </div>
  )
}


