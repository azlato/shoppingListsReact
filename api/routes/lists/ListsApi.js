const uuid = require('uuid');

const lists = new Map();

const createList = (values) => {
    const list = {
        id: uuid.v4(),
        name: values.name,
    };

    lists.set(list.id, list);
    return list;
}

const getLists = () => {
    return [...lists.values()];
};

const getList = (id) => {
    return lists.get(id);
};

const putList = (id, data) => {
    const list = getList(id);
    if (!list) {
        throw new Error('Unknown list');
    };

    // TODO: should check format of data
    lists.set(id, data);

    return data;
};

module.exports = {
    createList,
    getLists,
    getList,
    putList,
};
