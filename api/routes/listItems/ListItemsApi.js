const uuid = require('uuid');

const listIdsToItems = new Map();

const createListItem = (listId, values) => {
    const listItems = listIdsToItems.get(listId) || [];

    const itemWithName = listItems.find(item => item.name === values.name);
    if (itemWithName) {
        throw new Error(`List item with name '${values.name}' already exists`);
    }

    const item = {
        id: uuid.v4(),
        name: values.name,
    };
    listItems.push(item);
    listIdsToItems.set(listId, listItems);
    return item;
}

const getListItems = (listId) => {
    const listItems = listIdsToItems.get(listId) || [];
    return listItems;
};

const deleteListItem = (listId, itemId) => {
    const listItems = listIdsToItems.get(listId);
    if (!listItems) {
        throw new Error(`List with id '${listId}' does not exist`);
    }

    const foundItem = listItems.find(item => item.id !== itemId);
    if (!foundItem) {
        throw new Error(`List item id '${itemId}' is not inside list with id '${listId}'`);
    }

    const filteredItems = listItems.filter(item => item.id !== itemId);
    return filteredItems;
}

module.exports = {
    createListItem,
    getListItems,
};
