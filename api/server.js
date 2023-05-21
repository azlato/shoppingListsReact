const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const ListRouter = require('./routes/list/ListRouter');

const app = new Koa();

app.use(bodyParser());

app.use(ListRouter.routes())
    .use(ListRouter.allowedMethods());

app.listen(3000);

console.log("API server running on http://localhost:3000");

