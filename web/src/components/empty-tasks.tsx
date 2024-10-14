import taskIcon from "../assets/tasks-svgrepo-com.svg"
import { Plus  } from "lucide-react"
import { Button } from "./ui/button"
import { DialogTrigger } from "./ui/dialog"

export function EmptyTasks(){
  return(
    <div className="h-screen flex flex-col items-center justify-center gap-8">
          <img src={taskIcon} alt="task-icon" className="size-48" />
          <p className="text-teal-50 leading-relaxed max-w-80 text-center">
            You haven't registered any tasks, how about registering one right now?
          </p>

        <DialogTrigger asChild>
          <Button>
              <Plus className="size-4"/>
              Register task
            </Button>
        </DialogTrigger>
      </div>
  )
}
