import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import TaskIcon from "../assets/tasks-svgrepo-com.svg";
import { Progress, ProgressIndicator } from './ui/progress-bar';
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import { PendingTasks } from "./pending-tasks";


export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return null
  }

  const firstDayOfWeek = dayjs().startOf('week').format('MMM D')
  const lastDayOfWeek = dayjs().endOf('week').format('MMM D')
  const completedPercentage = Math.round(data?.completed * 100 / data?.total)

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="size-7" src={TaskIcon} alt="logo-task" />
          <span className="text-lg font-semibold">{firstDayOfWeek} - {lastDayOfWeek}</span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Register task
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-teal-400">
          <span>You completed <span className="text-teal-100">{data?.completed}</span> of <span className="text-teal-100">{data?.total}</span> tasks this week</span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />
      <PendingTasks />


      <div className="flex flex-col gap-6">
        <h2 className="text-x1 font-medium">Your week</h2>

        {data.tasksPerDay ? (Object?.entries(data?.tasksPerDay).map(([date, tasks]) => {

          const weekDay = dayjs(date).format('dddd')
          const formattedDate = dayjs(date).format('MMMM D')

          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium">
                {weekDay}
                <span className="text-teal-400 text-xs">({formattedDate})</span>
              </h3>

              <ul className="flex flex-col gap-3">
                {tasks.map(task => {
                  const time = dayjs(task.completedAt).format('hh:mm A')
                  return (
                    <li key={task.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-teal-500" />
                      <span className="text-sm text-teal-200">You completed "<span className="text-teal-100">{task.title}</span>" at <span className="text-teal-100">{time}</span></span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })) : null}

      </div>

    </div>
  )
}
