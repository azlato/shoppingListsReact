import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import ListRouter from './routes/lists/ListsRouter';
import ListItemsRouter from './routes/listItems/ListItemsRouter';

export const app = new Koa();

app.use(bodyParser({}));
app.use(cors());

app.use(ListRouter.routes())
  .use(ListRouter.allowedMethods());

app.use(ListItemsRouter.routes())
  .use(ListItemsRouter.allowedMethods());

app.listen(3000);

console.log('API server running on http://localhost:3000');
