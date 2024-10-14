import { X } from "lucide-react";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "./ui/radio-goup";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTask } from "../http/create-task";
import { useQueryClient } from "@tanstack/react-query";


const createTaskForm = z.object({
  title: z.string().min(1, 'inform task'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateTaskForm = z.infer<typeof createTaskForm>

export function CreateTask() {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(createTaskForm),
  })

  async function handleCreateTask(data: CreateTaskForm) {
    await createTask({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    })
    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-tasks'] })

    reset()
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex-col flex-3 gap-3">
          <div className="flex place-items-center justify-between">
            <DialogTitle>
              Register a task
            </DialogTitle>
            <DialogClose asChild>
              <X className="size-5 text-teal-600" />
            </DialogClose>
          </div>
          <DialogDescription>
            Add simple or recurring tasks
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit(handleCreateTask)} className=" flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">What is the task?</Label>
              <Input id="title" autoFocus placeholder="study, do homework, etc..."
                {...register('title')}
              />
               {formState.errors.title && (
                <p className="text-teal-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">How many times a week ?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                render={({ field}) => {
                  return (
                    <RadioGroup onValueChange={field.onChange} value={field.value}>
                      <RadioGroupItem value="1">
                        <RadioGroupIndicator />
                        <span className="text-teal-300 text-sm font-medium leading-none">1x a weeak</span>
                        <span className="text-lg leading-none">🥱</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="2">
                        <RadioGroupIndicator />
                        <span className="text-teal-300 text-sm font-medium leading-none">2x a weeak</span>
                        <span className="text-lg leading-none">👀</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="3">
                        <RadioGroupIndicator />
                        <span className="text-teal-300 text-sm font-medium leading-none">3x a weeak</span>
                        <span className="text-lg leading-none">😗</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="4">
                        <RadioGroupIndicator />
                        <span className="text-teal-300 text-sm font-medium leading-none">4x a weeak</span>
                        <span className="text-lg leading-none">😮</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="5">
                        <RadioGroupIndicator />
                        <span className="text-teal-300 text-sm font-medium leading-none">5x a weeak</span>
                        <span className="text-lg leading-none">😎</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="6">
                        <RadioGroupIndicator />
                        <span className="text-teal-300 text-sm font-medium leading-none">6x a weeak</span>
                        <span className="text-lg leading-none">🫡</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-teal-300 text-sm font-medium leading-none">7x a weeak</span>
                        <span className="text-lg leading-none">🤖</span>
                      </RadioGroupItem>

                    </RadioGroup>
                  )
                }}
              />
            </div>
            <div className="flex flex-col gap-2">

            </div>

          </div>
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" className="flex-1" variant="secondary">Close</Button>
            </DialogClose>
            <Button className="flex-1">Register</Button>
          </div>
        </form>
      </div>

    </DialogContent>
  )
}
