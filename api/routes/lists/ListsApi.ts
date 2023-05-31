import {v4 as uuid} from 'uuid';
import { deleteAllListItems } from '../listItems/ListItemsApi';

const lists = new Map<string, IList>();

export interface IList {
  id: string;
  name: string;
}

export const createList = (values: Omit<IList, "id">) => {
  const listWithName = [...lists.values()].find((item) => item.name === values.name);
  if (listWithName) {
    throw new Error(`List with name '${values.name}' already exists`);
  }

  const list = {
    id: uuid(),
    name: values.name,
  };

  lists.set(list.id, list);
  return list;
};

export const getLists = () => [...lists.values()];

export const getList = (id: string) => lists.get(id);

export const putList = (id: string, values: IList) => {
  const list = getList(id);
  if (!list) {
    throw new Error('List does not exist');
  }

  const listWithName = [...lists.values()].find((item) => item.name === values.name);
  if (listWithName) {
    throw new Error(`List with name '${values.name}' already exists`);
  }

  lists.set(id, values);

  return values;
};

export const deleteList = (id: string) => {
  const list = getList(id);
  if (!list) {
    throw new Error(`List with id '${id}' does not exist`);
  }

  // cleanup items
  deleteAllListItems(id);

  lists.delete(id);
};
