"use client";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import SearchInput from "./search-input";
import Image from "next/image";
import { useGetChats, useSearchChats } from "@/data/chats";
import ConversationItem from "./conversation-item";
import UserItem from "./user-item";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import BigSpinner from "../ui/big-spinner";

export default function ChatSidebar() {
   const currentChat = useStore((state) => state.currentChat);
   const setCurrentChat = useStore((state) => state.setCurrentChat);
   const chatSearchQuery = useStore((state) => state.chatSearchQuery);

   const { data: searchedChats, isLoading: isSearchLoading } = useSearchChats({
      searchQuery: chatSearchQuery,
   });
   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useGetChats();

   const { ref, inView } = useInView();

   useEffect(() => {
      if (inView && hasNextPage) {
         fetchNextPage();
      }
   }, [inView, hasNextPage, fetchNextPage]);

   const chats = data?.pages?.flatMap((page) => page?.getChats);

   return (
      <div
         className={cn(
            "absolute left-0 top-0 h-full w-full max-w-[348px]",
            currentChat && "hidden sm:block",
         )}
      >
         <div className="rounded-2xl bg-white px-4 py-3 shadow-card">
            <SearchInput />
            <div className="mt-3 h-[calc(100svh-174px)] space-y-3 overflow-y-auto xl:h-[calc(100svh-194px)]">
               {/* All Chats */}
               {searchedChats === null && (
                  <>
                     {/* {status === "loading" && <div className="text-center">Loading...</div>} */}
                     {chats?.length === 0 && (
                        <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                           <Image
                              src="/assets/icons/no-data.svg"
                              alt="No data"
                              width={100}
                              height={100}
                           />
                           <p className="font-medium text-gray-800">
                              No chat Found!
                           </p>
                        </div>
                     )}
                     {chats?.map((chat) => (
                        <ConversationItem
                           key={chat?._id}
                           chat={chat}
                           onClick={() => setCurrentChat(chat)}
                        />
                     ))}
                     {chats?.length > 0 && (
                        <div
                           ref={ref}
                           className={cn("flex items-center justify-center")}
                        >
                           {isFetchingNextPage && <BigSpinner />}
                        </div>
                     )}
                  </>
               )}
               {/* Searched Chats */}
               {searchedChats !== null && (
                  <>
                     {isSearchLoading && (
                        <div className="text-center">Loading...</div>
                     )}
                     {searchedChats?.length === 0 && (
                        <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                           <Image
                              src="/assets/icons/no-data.svg"
                              alt="No data"
                              width={100}
                              height={100}
                           />
                           <p className="font-medium text-gray-800">
                              No chat Found!
                           </p>
                        </div>
                     )}
                     {searchedChats?.map((user) => (
                        <UserItem key={user?._id} user={user} chats={chats} />
                     ))}
                  </>
               )}
            </div>
         </div>
      </div>
   );
}
