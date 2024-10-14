import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createTask } from '../../functions/create-task';

export const createTaskRoute: FastifyPluginAsyncZod = async  (app) => {
  app.post('/tasks', {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number(),
      })
    }
  } ,  async (request) =>{
    const {title, desiredWeeklyFrequency} = request.body

    await createTask({
      title,
      desiredWeeklyFrequency
    })
  })
};
