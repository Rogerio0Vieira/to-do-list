import fastify from "fastify";
import { createTask } from "../functions/create-task";
import {z} from "zod"


const app = fastify()

app.post('/tasks', async (request) =>{
  const createTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    //set priority as a literal with 3 possible values, low, medium, hight
  })
  const body = createTaskSchema.parse(request.body)

  await createTask({
    title: body.title,
    description: body.description,
  })
})

app.listen({
  port: 3333,
}).then(()=>{
  console.log('HTTP sever runing')
})
