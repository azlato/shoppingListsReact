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

    if (!data.name) {
        ctx.response.status = 400;
        ctx.body = `You should send list name at body`;
    }

    try {
        const newList = createList(data);
        ctx.response.status = 201;
        ctx.body = newList;
    } catch (error) {
        ctx.response.status = 409;
        ctx.body = error.message;
    }
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
    const data = ctx.request.body;
    if (data.name || data.id) {
        ctx.response.status = 400;
        ctx.body = `You should send list name and id at body`;
    }

    if (id !== data.id) {
        ctx.response.status = 400;
        ctx.body = `Data id '${data.id}' and parameter id '${id}' does not match`;
    }

    try {
        putList(id, data);
        ctx.body = data;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

module.exports = router;
