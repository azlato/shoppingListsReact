import React, {
  createContext, useMemo, useState, useCallback,
} from 'react';
import { useMutation } from 'react-query';
import apiClient from '../utils/apiClient';

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/listItems`;

export interface IListItem {
  id: string;
  listId: string;
  name: string;
}

interface IListItemsDataContext {
  listItems: IListItem[];
  fetchList(id: string): Promise<unknown>;
}

interface IListItemsApiContext {
  createListItem(data: Partial<IListItem>): Promise<unknown>;
  deleteListItem(item: IListItem): Promise<unknown>;
}

export const ListItemsDataContext = createContext<IListItemsDataContext>({
  listItems: [],
  fetchList: () => Promise.resolve(),
});

export const ListItemsApiContext = createContext<IListItemsApiContext>({
  createListItem: () => Promise.resolve(),
  deleteListItem: () => Promise.resolve(),
});

const getListHandler = async (id: string): Promise<IListItem[]> => {
  const response = await apiClient(`${API_URL}/${id}`, 'GET');
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Failed fetch list items for list id '${id}'. ${responseText}`,
    );
  }
  return response.json();
};

const postListItemHandler = async (data: Partial<IListItem>): Promise<string> => {
  const response = await apiClient(`${API_URL}/${data.listId}`, 'POST', data);
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Failed to insert new list item ${responseText}`);
  }
  return response.text();
};

const deleteListItemHandler = async (item: IListItem): Promise<string> => {
  const response = await apiClient(`${API_URL}/${item.listId}/${item.id}`, 'DELETE');
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Failed to delete list item with id '${item.id}'. ${responseText}`,
    );
  }
  return response.text();
};

export function ListItemsContextProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<IListItem[]>([]);

  const fetchList = useCallback(async (id: string) => {
    const fetchedList = await getListHandler(id);
    setData(fetchedList);
    return fetchedList;
  }, [setData]);

  const dataValue = useMemo(() => ({
    listItems: data,
    fetchList,
  }), [data, fetchList]);

  // Mutations
  const { mutateAsync: createListItem } = useMutation(postListItemHandler);
  const { mutateAsync: deleteListItem } = useMutation(deleteListItemHandler);
  const apiValue = useMemo(() => ({
    createListItem,
    deleteListItem,
  }), [createListItem, deleteListItem]);

  return (
    <ListItemsDataContext.Provider value={dataValue}>
      <ListItemsApiContext.Provider value={apiValue}>
        {children}
      </ListItemsApiContext.Provider>
    </ListItemsDataContext.Provider>
  );
}
