import { useEffect, useRef } from "react";
import { useGetTicketMessages } from "@/data/tickets";
import ChatBubble from "@/components/Support/chat-bubble";
import { useStore } from "@/store";

export default function Messages() {
   const scrollRef = useRef();
   const currentTicket = useStore((state) => state.currentTicket);

   const { data: messages, isLoading } = useGetTicketMessages({ ticketId: currentTicket?._id });

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
   }, [messages]);

   if (isLoading) {
      return (
         <div className="h-[calc(100svh-268px)] xl:h-[calc(100svh-296px)] mt-2 space-y-3 overflow-y-auto flex items-center justify-center">
            Loading messages...
         </div>
      );
   }

   return (
      <div className="h-[calc(100svh-268px)] xl:h-[calc(100svh-296px)] mt-2 space-y-3 overflow-y-auto">
         {messages?.map((message) => (
            <ChatBubble key={message?._id} message={message} ref={scrollRef} />
         ))}
      </div>
   );
}
