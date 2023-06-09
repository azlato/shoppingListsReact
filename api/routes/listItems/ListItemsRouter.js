const Router = require('@koa/router');
const {
  createListItem, getListItems, deleteListItem, putListItem,
} = require('./ListItemsApi');

const router = new Router({
  prefix: '/listItems',
});

router.post('/:listId', (ctx) => {
  const { listId } = ctx.params;
  const data = ctx.request.body;

  if (!data.name) {
    ctx.response.status = 400;
    ctx.body = 'You should send list name at body';
  }

  try {
    const newListItem = createListItem(listId, data);
    ctx.response.status = 201;
    ctx.body = newListItem;
  } catch (error) {
    ctx.response.status = 409;
    ctx.body = error.message;
  }
});

router.get('/:listId', (ctx) => {
  const { listId } = ctx.params;
  const list = getListItems(listId);
  ctx.body = list;
});

router.delete('/:listId/:itemId', (ctx) => {
  const { listId, itemId } = ctx.params;
  if (!listId || !itemId) {
    ctx.response.status = 400;
    ctx.body = 'Id is not defined';
  }

  try {
    deleteListItem(listId, itemId);
    ctx.status = 200;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

router.put('/:listId/:itemId', (ctx) => {
  const { listId, itemId } = ctx.params;
  if (!listId || !itemId) {
    ctx.response.status = 400;
    ctx.body = 'Id is not defined';
  }

  const data = ctx.request.body;
  if (!data.name || !data.id || !data.listId) {
    ctx.response.status = 400;
    ctx.body = 'You should send item name, id and listId at body';
  }

  try {
    putListItem(listId, itemId, data);
    ctx.status = 200;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

module.exports = router;
