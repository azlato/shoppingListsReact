const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const ListRouter = require('./routes/lists/ListsRouter');
const ListItemsRouter = require('./routes/listItems/ListItemsRouter');

const app = new Koa();

app.use(bodyParser());
app.use(cors());

app.use(ListRouter.routes())
    .use(ListRouter.allowedMethods());

app.use(ListItemsRouter.routes())
    .use(ListItemsRouter.allowedMethods());

app.listen(3000);

console.log("API server running on http://localhost:3000");

