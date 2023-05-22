const uuid = require('uuid');

const lists = new Map();

const createList = (values) => {
    const listWithName = [...lists.values()].find(item => item.name === values.name);
    if (listWithName) {
        throw new Error(`List with name '${values.name}' already exists`);
    }

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

const putList = (id, values) => {
    const list = getList(id);
    if (!list) {
        throw new Error('List does not exist');
    };

    const listWithName = [...lists.values()].find(item => item.name === values.name);
    if (listWithName) {
        throw new Error(`List with name '${values.name}' already exists`);
    }

    lists.set(id, values);

    return values;
};

module.exports = {
    createList,
    getLists,
    getList,
    putList,
};
