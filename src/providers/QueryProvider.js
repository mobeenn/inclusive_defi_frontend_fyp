"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryProvider({ children }) {
   const queryClient = new QueryClient();

   return (
      <QueryClientProvider client={queryClient}>
         {children}
         <ReactQueryDevtools />
      </QueryClientProvider>
   );
}
