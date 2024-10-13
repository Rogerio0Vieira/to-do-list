import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createTaskCompletion } from '../../functions/create-task-completion';


export const createCompletionRoute: FastifyPluginAsyncZod = async  (app) => {
  app.post('/completions', {
    schema: {
      body: z.object({
        taskId: z.string(),
      })
    }
  } ,  async (request) =>{
    const {taskId} = request.body

    await createTaskCompletion({
      taskId
    })
  })


};
