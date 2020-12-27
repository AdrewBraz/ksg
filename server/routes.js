// @ts-check
import dataController from '../controller';

export default (router) => router
  .get('/', (req, reply) => {
    reply.view('index.pug');
  })
  .get('/search', async (_req, reply) => {
    await dataController(_req, reply);
  });
