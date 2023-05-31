import {v4 as uuid} from 'uuid';

const listIdsToItems = new Map<string, IListItem[]>();

export interface IListItem {
  name: string;
  listId: string;
  id: string;
}

export const createListItem = (listId: string, values: {name: string, listId: string}) => {
  const listItems = listIdsToItems.get(listId) || [];

  const itemWithName = listItems.find((item: IListItem) => item.name === values.name);
  if (itemWithName) {
    throw new Error(`List item with name '${values.name}' already exists`);
  }

  const item = {
    id: uuid(),
    listId,
    name: values.name,
  };
  listItems.push(item);
  listIdsToItems.set(listId, listItems);
  return item;
};

export const getListItems = (listId: string) => {
  const listItems = listIdsToItems.get(listId) || [];
  return listItems;
};

export const deleteAllListItems = (listId: string) => {
  const hasList = listIdsToItems.has(listId);
  if (hasList) {
    listIdsToItems.delete(listId);
  }

  return listIdsToItems;
};

export const deleteListItem = (listId: string, itemId: string) => {
  const listItems = listIdsToItems.get(listId);
  if (!listItems) {
    throw new Error(`List with id '${listId}' does not exist`);
  }

  const foundItem = listItems.find((item) => item.id === itemId);
  if (!foundItem) {
    throw new Error(`List item id '${itemId}' is not inside list with id '${listId}'`);
  }

  const filteredItems = listItems.filter((item) => item.id !== itemId);
  listIdsToItems.set(listId, filteredItems);
  return filteredItems;
};

export const putListItem = (listId: string, itemId: string, data: {id: string; listId: string; name: string}) => {
  const listItems = listIdsToItems.get(listId);
  if (!listItems) {
    throw new Error(`List with id '${listId}' does not exist`);
  }

  const foundItem = listItems.find((item: IListItem) => item.id === itemId);
  if (!foundItem) {
    throw new Error(`List item id '${itemId}' is not inside list with id '${listId}'`);
  }

  const itemWithName = listItems.find((item: IListItem) => item.name === data.name);
  if (itemWithName) {
    throw new Error(`List item with name '${data.name}' already exists`);
  }

  const updatedItems = listItems.map((item: IListItem) => {
    if (item.id === itemId) {
      return data;
    }

    return item;
  });
  listIdsToItems.set(listId, updatedItems);
  return updatedItems;
};
