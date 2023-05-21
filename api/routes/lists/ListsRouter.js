const Router = require('@koa/router');
const { createList, getLists, getList, putList } = require('./ListsApi');

const router = new Router({
    prefix: '/lists',
});

router.get('/', ctx => {
    ctx.body = getLists();
});

router.post('/', ctx => {
    const data = ctx.request.body;
    const newList = createList(data);

    ctx.response.status = 201;
    ctx.body = newList;
});

router.get('/:id', ctx => {
    const id = ctx.params.id;
    const list = getList(id);

    if (!list) {
        ctx.response.status = 404;
    } else {
        ctx.body = list;
    }
});

router.put('/:id', ctx => {
    const id = ctx.params.id;
    const list = getList(id);

    if (!list) {
        ctx.response.status = 404;
    } else {
        ctx.body = list;
    }
});

module.exports = router;
