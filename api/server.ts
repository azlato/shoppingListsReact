import Koa from 'koa';
import * as cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import ListRouter from './routes/lists/ListsRouter';
import ListItemsRouter from './routes/listItems/ListItemsRouter';

const app = new Koa();

app.use(bodyParser({}));
// @ts-ignore // @todo cors is not ES module
app.use(cors());

app.use(ListRouter.routes())
  .use(ListRouter.allowedMethods());

app.use(ListItemsRouter.routes())
  .use(ListItemsRouter.allowedMethods());

if (import.meta.env.PROD) {
  app.listen(3000);

  console.log('API server running on http://localhost:3000');
}

export const viteNodeApp = app;
