import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createTask } from '../../functions/create-task';

export const createTaskRoute: FastifyPluginAsyncZod = async  (app) => {
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
        desiredWeeklyFrequency: z.number(),
      })
    }
  } ,  async (request) =>{
    const {description, title, priority, status, desiredWeeklyFrequency} = request.body

    await createTask({
      title,
      description,
      priority,
      status,
      desiredWeeklyFrequency
    })
  })
};
