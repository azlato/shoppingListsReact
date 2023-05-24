import React, { createContext, useMemo } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import apiClient from '../utils/apiClient';

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/lists`;

export interface IList {
  id: string;
  name: string;
}

interface IShopingListsDataContext {
  items: IList[];
}

export const ShopingListsDataContext = createContext<IShopingListsDataContext>({
  items: [],
});

interface IShopingListsApiContext {
  createList(data: Partial<IList>): Promise<Response>;
  updateList(data: IList): Promise<Response>;
  deleteList(id: string): Promise<Response>;
}

export const ShopingListsApiContext = createContext<IShopingListsApiContext>({
  createList: () => Promise.resolve(new Response()),
  updateList: () => Promise.resolve(new Response()),
  deleteList: () => Promise.resolve(new Response()),
});

const postListHandler = async (data: Partial<IList>): Promise<Response> => {
  const response = await apiClient(API_URL, 'POST', data);
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Failed to insert new list ${responseText}`);
  }
  return response;
};

const putListHandler = async (data: IList): Promise<Response> => {
  const response = await apiClient(`${API_URL}/${data.id}`, 'PUT', data);
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Failed to update list with id '${data.id}'. ${responseText}`,
    );
  }
  return response;
};

const deleteListHandler = async (id: string): Promise<Response> => {
  const response = await apiClient(`${API_URL}/${id}`, 'DELETE');
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Failed to delete list with id '${id}'. ${responseText}`,
    );
  }
  return response;
};

export function ShopingListsContextProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data } = useQuery<IList[]>(
    'lists',
    () => apiClient(API_URL).then((res) => res.json()),
  );

  const dataValue = useMemo(() => ({
    items: data || [],
  }), [data]);

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
  const apiValue = useMemo(() => ({
    createList,
    updateList,
    deleteList,
  }), [createList, updateList, deleteList]);

  return (
    <ShopingListsDataContext.Provider value={dataValue}>
      <ShopingListsApiContext.Provider value={apiValue}>
        {children}
      </ShopingListsApiContext.Provider>
    </ShopingListsDataContext.Provider>
  );
}
