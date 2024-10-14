import { X } from "lucide-react";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "./ui/radio-goup";

export function CreateTask(){
  return(
          <DialogContent>
        <div className="flex flex-col gap-6 h-full">
        <div className="flex-col flex-3 gap-3">
            <div className="flex place-items-center justify-between">
              <DialogTitle>
                Register a task
              </DialogTitle>
              <DialogClose asChild>
                <X className="size-5 text-teal-600"/>
              </DialogClose>
            </div>
            <DialogDescription>
              Add simple or recurring tasks
            </DialogDescription>
          </div>

          <form action="" className=" flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">What is the task?</Label>
                <Input id="title" autoFocus placeholder="study, do homework, etc..."/>
              </div>
              <div className="flex flex-col gap-2">
              <Label htmlFor="description">Describe the task</Label>
              <Input id="description" autoFocus placeholder="I will study grammar for 2 hours"/>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">How many times a week ?</Label>
                <RadioGroup>
                  <RadioGroupItem value="1">
                    <RadioGroupIndicator/>
                    <span className="text-teal-300 text-sm font-medium leading-none">1x a weeak</span>
                    <span className="text-lg leading-none">🥱</span>
                  </RadioGroupItem>
                  <RadioGroupItem value="2">
                    <RadioGroupIndicator/>
                    <span className="text-teal-300 text-sm font-medium leading-none">2x a weeak</span>
                    <span className="text-lg leading-none">👀</span>
                  </RadioGroupItem>
                  <RadioGroupItem value="3">
                    <RadioGroupIndicator/>
                    <span className="text-teal-300 text-sm font-medium leading-none">3x a weeak</span>
                    <span className="text-lg leading-none">😗</span>
                  </RadioGroupItem>
                  <RadioGroupItem value="4">
                    <RadioGroupIndicator/>
                    <span className="text-teal-300 text-sm font-medium leading-none">4x a weeak</span>
                    <span className="text-lg leading-none">😮</span>
                  </RadioGroupItem>

                </RadioGroup>
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
