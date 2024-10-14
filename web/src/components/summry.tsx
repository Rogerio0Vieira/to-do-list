import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import  TaskIcon  from "../assets/tasks-svgrepo-com.svg";
import { Progress, ProgressIndicator } from './ui/progress-bar';
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";


export function Summary(){
  return(
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
       <div className="flex items-center gap-3">
          <img className="size-7" src={TaskIcon} alt="logo-task" />
          <span className="text-lg font-semibold">5 to 10 agosto</span>
       </div>
        <DialogTrigger asChild>
            <Button size="sm">
                <Plus className="size-4"/>
                Register task
              </Button>
          </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{width: 200}}/>
        </Progress>

        <div className="flex items-center justify-between text-xs text-teal-400">
          <span>You completed <span className="text-teal-100">8</span> of <span className="text-teal-100">15</span> tasks this week</span>
          <span>50%</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <OutlineButton>
          <Plus className="size-4 text-teal-600" />
          Study
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-teal-600" />
          Study
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-teal-600" />
          Study
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-teal-600" />
          Study
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-teal-600" />
          Study
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-x1 font-medium">Your week</h2>


        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Saturnday
            <span className="text-teal-400 text-xs">(Agust 10)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-teal-500" />
              <span className="text-sm text-teal-200">You completed "<span className="text-teal-100">study</span>" at <span className="text-teal-100">8:13 am</span></span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}
