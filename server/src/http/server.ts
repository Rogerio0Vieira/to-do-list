import fastify from "fastify";
import { createTask } from "../functions/create-task";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from "zod"
import { getWeekPendingTasks } from "../functions/get-week-pending-tasks";


const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/pending-tasks', async () =>{
  const {pendingTasks} = await getWeekPendingTasks()
  
  return {pendingTasks}
})

app.post('/tasks', {
  schema: {
    body: z.object({
      title: z.string(),
      description: z.string(),
      status: z.boolean(),
      priority: z.union([
        z.literal('low'),
        z.literal('medium'),
        z.literal('high'),
      ]),
    })
  }
} ,  async (request) =>{
  const {description, title, priority, status} = request.body

  await createTask({
    title,
    description,
    priority,
    status
  })
})

app.listen({
  port: 3333,
}).then(()=>{
  console.log('HTTP sever runing')
})
