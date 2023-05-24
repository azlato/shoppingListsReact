let mockItemId = 0;
jest.mock('uuid', () => ({
  v4: () => { mockItemId = mockItemId + 1; return mockItemId; },
}));

describe('createListItem', () => {
    let createListItem;

    beforeEach(() => {
        mockItemId = 0;
        jest.resetModules();
        createListItem = require('./ListItemsApi').createListItem;
    });

    it('creates new list and returns it', () => {
        const listId = '12345';

        expect(createListItem(listId, { listId, name: 'Milk1' })).toEqual({
            id: 1,
            name: 'Milk1',
            listId,
        });
        expect(createListItem(listId, { listId, name: 'Milk2' })).toEqual({
            id: 2,
            name: 'Milk2',
            listId,
        });
    });

    it('should throw error if user creates duplicity', () => {
        const listId = '12345';
        const name = 'Milk';

        createListItem(listId, { listId, name });
        expect(() => createListItem(listId, { listId, name })).toThrow('List item with name \'Milk\' already exists');
    })
});

describe('getListItems', () => {
    let createListItem, getListItems;

    beforeEach(() => {
        mockItemId = 0;
        jest.resetModules();
        createListItem = require('./ListItemsApi').createListItem;
        getListItems = require('./ListItemsApi').getListItems;
    });

    it('should return empty array if list does not exist', () => {
        expect(getListItems('listId')).toEqual([]);
    });

    it('should return array of items if list has items', () => {
        const listId = '12345';

        createListItem(listId, { listId, name: 'Milk' });
        expect(getListItems(listId)).toEqual([{
            id: 1,
            listId,
            name: 'Milk'
        }]);
    });
});

describe('deleteListItem', () => {
    let createListItem, deleteListItem;

    beforeEach(() => {
        mockItemId = 0;
        jest.resetModules();
        createListItem = require('./ListItemsApi').createListItem;
        deleteListItem = require('./ListItemsApi').deleteListItem;
    });

    it('should throw error if list does not exist', () => {
        expect(() => deleteListItem('listId', 'itemId')).toThrow(
            `List with id 'listId' does not exist`
        )
    });

    it('should throw error if list does not have itemId to delete', () => {
        createListItem('listId', { listId: 'listId', name: 'Milk' });
        expect(() => deleteListItem('listId', 'unknownItemId')).toThrow(
            `List item id 'unknownItemId' is not inside list with id 'listId'`
        )
    });

    it('should remove item form list and return empty list', () => {
        createListItem('listId', { listId: 'listId', name: 'Milk' });
        expect(deleteListItem('listId', 1)).toEqual([])
    });
});

describe('putListItem', () => {
    let createListItem, putListItem;

    beforeEach(() => {
        mockItemId = 0;
        jest.resetModules();
        createListItem = require('./ListItemsApi').createListItem;
        putListItem = require('./ListItemsApi').putListItem;
    });

    it('should throw error if list does not exist', () => {
        const newData = { id: 1, name: 'New name', listId: 'listId' };

        expect(() => putListItem('listId', 'itemId', newData)).toThrow(
            `List with id 'listId' does not exist`
        )
    });

    it('should throw error if list does not have itemId to update', () => {
        const newData = { id: 1, name: 'New name', listId: 'listId' };

        createListItem('listId', { listId: 'listId', name: 'Milk' });
        expect(() => putListItem('listId', 'unknownItemId', newData)).toThrow(
            `List item id 'unknownItemId' is not inside list with id 'listId'`
        )
    });

    it('should throw error if item with name already exists', () => {
        const newData = { id: 1, name: 'Milk2', listId: 'listId' };

        createListItem('listId', { listId: 'listId', name: 'Milk1' });
        createListItem('listId', { listId: 'listId', name: 'Milk2' });
        expect(() => putListItem('listId', 1, newData)).toThrow(
            `List item with name 'Milk2' already exists`
        )
    });

    it('should update item to new data', () => {
        const newData = { id: 1, name: 'New name', listId: 'listId' };

        createListItem('listId', { listId: 'listId', name: 'Milk1' });
        createListItem('listId', { listId: 'listId', name: 'Milk2' });
        expect(putListItem('listId', 1, newData)).toEqual([{
            id: 1,
            listId: "listId",
            name: "New name",
        }, {
            id: 2,
            listId: "listId",
            name: "Milk2",
        }])
    });
});
