import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { createTaskRoute } from "./routes/create-task";
import { createCompletionRoute } from "./routes/create-completions";
import { getPendingTasksRoute } from "./routes/get-pending-tasks";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";



const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: '*',
})

app.register(createTaskRoute)
app.register(createCompletionRoute)
app.register(getPendingTasksRoute)
app.register(getWeekSummaryRoute)


app.listen({
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(()=>{
  console.log('HTTP sever runing')
})


