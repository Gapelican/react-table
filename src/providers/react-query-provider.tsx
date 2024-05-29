"use client";
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function ReactQueryClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}