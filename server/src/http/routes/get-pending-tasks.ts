import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekPendingTasks } from '../../functions/get-week-pending-tasks';


export const getPendingTasksRoute: FastifyPluginAsyncZod = async  (app) => {
  app.get('/pending-tasks', async () =>{
    const {pendingTasks} = await getWeekPendingTasks()

    return {pendingTasks}
  })
};
