import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './features/store';
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import {QueryClient , QueryClientProvider } from "@tanstack/react-query"


disableReactDevTools();
const queryClient = new QueryClient()


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient} >
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
        </QueryClientProvider>

      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);


