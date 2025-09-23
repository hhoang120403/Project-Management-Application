import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './authContext';
// import { Provider } from 'react-redux';
// import { store } from '@/store/store';

export const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* <Provider store={store}> */}
        {children}
        <Toaster position='top-right' richColors />
        {/* </Provider> */}
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
