import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { ShopingListsContextProvider } from './context/ShopingListsContext';
import { ListItemsContextProvider } from './context/ListItemsContext';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ShopingListsContextProvider>
        <ListItemsContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ListItemsContextProvider>
      </ShopingListsContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
