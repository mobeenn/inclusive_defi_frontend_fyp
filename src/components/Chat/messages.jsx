import { useEffect, useRef } from "react";
import { useGetChatMessages } from "@/data/chats";
import ChatBubble from "../Chat/chat-bubble";
import { useStore } from "@/store";
import BigSpinner from "../ui/big-spinner";
import Image from "next/image";
import { socket } from "@/lib/socket";

export default function Messages() {
   const scrollRef = useRef();
   const user = useStore((state) => state.user);
   const currentChat = useStore((state) => state.currentChat);
   const newMessages = useStore((state) => state.newMessages);
   const upcomingMessages = useStore((state) => state.upcomingMessages);
   const removeChatNewMessages = useStore(
      (state) => state.removeChatNewMessages,
   );
   const removeUpcomingMessage = useStore(
      (state) => state.removeUpcomingMessage,
   );

   const { data: messages, isLoading } = useGetChatMessages({
      chatId: currentChat?._id,
   });

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
   }, [messages, upcomingMessages]);

   useEffect(() => {
      // Read All the unread messages
      socket.emit("readMessages", {
         chatId: currentChat?._id,
         userId: user?._id,
      });

      return () => {
         removeChatNewMessages(currentChat?._id);
         removeUpcomingMessage(currentChat?._id);
      };
   }, [currentChat, removeChatNewMessages, removeUpcomingMessage, user]);

   if (isLoading) {
      return (
         <div className="mt-2 flex h-[calc(100svh-226px)] items-center justify-center space-y-3 overflow-y-auto xl:h-[calc(100svh-246px)]">
            <BigSpinner />
         </div>
      );
   }

   return (
      <div className="mt-2 h-[calc(100svh-226px)] space-y-3 overflow-y-auto xl:h-[calc(100svh-246px)]">
         {messages?.length === 0 && upcomingMessages?.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
               <Image
                  src="/assets/icons/no-data.svg"
                  alt="No data"
                  width={100}
                  height={100}
               />
               <p className="font-medium text-gray-800">No messages yet...</p>
            </div>
         )}

         {messages?.map((message) => (
            <ChatBubble key={message?._id} message={message} ref={scrollRef} />
         ))}
         {upcomingMessages?.map((message) => (
            <ChatBubble key={message?._id} message={message} ref={scrollRef} />
         ))}
      </div>
   );
}
