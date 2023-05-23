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

interface IListItemsContext {
  listItems: IListItem[];
  fetchList(id: string): Promise<unknown>;
  createListItem(data: Partial<IListItem>): Promise<unknown>;
  deleteListItem(data: { listId: string, itemId: string }): Promise<unknown>;
}

export const ListItemsContext = createContext<IListItemsContext>({
  listItems: [],
  fetchList: () => Promise.resolve(),
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

const deleteListItemHandler = async ({ listId, itemId }: { listId: string, itemId: string }): Promise<string> => {
  const response = await apiClient(`${API_URL}/${listId}/${itemId}`, 'DELETE');
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Failed to delete list item with id '${itemId}'. ${responseText}`,
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

  // Mutations
  const onSuccess = () => {
  };
  const { mutateAsync: createListItem } = useMutation(postListItemHandler, {
    onSuccess,
  });
  const { mutateAsync: deleteListItem } = useMutation(deleteListItemHandler, {
    onSuccess,
  });

  const value = useMemo(() => ({
    listItems: data,
    fetchList,
    createListItem,
    deleteListItem,
  }), [data, fetchList, createListItem, deleteListItem]);

  return <ListItemsContext.Provider value={value}>{children}</ListItemsContext.Provider>;
}
