import React, { createContext, useMemo } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import apiClient from '../utils/apiClient';

interface IList {
  id: string;
  name: string;
}

interface IShopingListsContext {
  items: IList[];
  addList(data: Partial<IList>): void;
}

export const ShopingListsContext = createContext<IShopingListsContext>({
  items: [],
  addList: () => {},
});

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/lists`;

const postList = async (data: Partial<IList>): Promise<string> => {
  const response = await apiClient(API_URL, 'POST', data);
  if (!response.ok) {
    throw new Error(`Failed to insert new list. Status ${response.statusText}: ${response.body}`);
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
  const { mutate: addList } = useMutation(postList, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('lists');
    },
  });

  const value = useMemo(() => ({
    items: data || [],
    addList,
  }), [data, addList]);

  return <ShopingListsContext.Provider value={value}>{children}</ShopingListsContext.Provider>;
}
