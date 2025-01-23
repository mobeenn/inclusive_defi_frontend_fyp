import { getAllChatMessages, getAllChats, searchChat } from "@/api/chats";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useGetChats() {
   return useInfiniteQuery({
      queryKey: ["chats"],
      queryFn: ({ pageParam = 1 }) => getAllChats({ pageParam }),
      getNextPageParam: (lastPage, pages) => {
         const nextPage = pages?.length + 1;
         return nextPage <= lastPage?.count ? nextPage : undefined;
      },
   });
}

export function useSearchChats({ searchQuery }) {
   return useQuery({
      queryKey: ["search-chats", searchQuery],
      queryFn: () => searchChat({ searchQuery }),
   });
}

export function useGetChatMessages({ chatId }) {
   const query = useQuery({
      queryKey: ["chat-messages", chatId],
      queryFn: () => getAllChatMessages({ chatId }),
      staleTime: 1000 * 60 * 60 * 24,
      enabled: false,
   });

   const { refetch } = query;

   useEffect(() => {
      refetch();
   }, [chatId, refetch]);

   return query;
}
