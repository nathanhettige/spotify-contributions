import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/ReactQueryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import Router from './router';
import { SpotifyAuthProvider } from './api/SpotifyAuth/useSpotifyAuth';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SpotifyAuthProvider>
        <ReactQueryDevtools />
        <Router />
      </SpotifyAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
