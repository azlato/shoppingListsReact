import React, { createContext, useMemo } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import apiClient from '../utils/apiClient';

export interface IList {
  id: string;
  name: string;
}

interface IShopingListsContext {
  items: IList[];
  createList(data: Partial<IList>): Promise<unknown>;
  updateList(data: IList): Promise<unknown>;
  deleteList(id: Pick<IList, 'id'>): Promise<unknown>;
}

export const ShopingListsContext = createContext<IShopingListsContext>({
  items: [],
  createList: () => Promise.resolve(),
  updateList: () => Promise.resolve(),
  deleteList: () => Promise.resolve(),
});

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/lists`;

const postListHandler = async (data: Partial<IList>): Promise<string> => {
  const response = await apiClient(API_URL, 'POST', data);
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Failed to insert new list ${responseText}`);
  }
  return response.text();
};

const putListHandler = async (data: IList): Promise<string> => {
  const response = await apiClient(`${API_URL}/${data.id}`, 'PUT', data);
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Failed to update list with id '${data.id}'. ${responseText}`,
    );
  }
  return response.text();
};

const deleteListHandler = async (data: IList): Promise<string> => {
  const response = await apiClient(API_URL, 'DELETE', data);
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Failed to delete list with id '${data.id}'. ${responseText}`,
    );
  }
  return response.text();
};

export function ShopingListsContextProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data } = useQuery<IList[]>(
    'lists',
    () => apiClient(API_URL).then((res) => res.json()),
  );

  // Mutations
  const onSuccess = () => {
    // Invalidate and refetch
    queryClient.invalidateQueries('lists');
  };
  const { mutateAsync: createList } = useMutation(postListHandler, {
    onSuccess,
  });
  const { mutateAsync: updateList } = useMutation(putListHandler, {
    onSuccess,
  });
  const { mutateAsync: deleteList } = useMutation(deleteListHandler, {
    onSuccess,
  });

  const value = useMemo(() => ({
    items: data || [],
    createList,
    updateList,
    deleteList,
  }), [data, createList, updateList, deleteList]);

  return <ShopingListsContext.Provider value={value}>{children}</ShopingListsContext.Provider>;
}
