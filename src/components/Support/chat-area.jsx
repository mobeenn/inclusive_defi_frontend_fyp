"use client";
import { FaChevronLeft } from "react-icons/fa";
import { useStore } from "@/store";
import Messages from "./messages";
import InputArea from "./input-area";
import { useEffect } from "react";
import CloseTicket from "./close-ticket";

export default function ChatArea() {
   const currentTicket = useStore((state) => state.currentTicket);
   const setCurrentTicket = useStore((state) => state.setCurrentTicket);
   const isTicketClosed = currentTicket?.ticketStatus === "closed";

   useEffect(() => {
      return () => {
         setCurrentTicket(null);
      };
   }, [setCurrentTicket]);

   if (currentTicket === null) {
      return (
         <div className="h-full px-4 py-3 bg-white shadow-card rounded-2xl ml-[calc(348px+16px)] hidden sm:flex items-center justify-center">
            <h1 className="text-2xl">Select A Conversation</h1>
         </div>
      );
   }

   return (
      <div className="h-full px-4 py-3 bg-white shadow-card rounded-2xl sm:ml-[calc(348px+16px)]">
         {/* Header */}
         <div className="flex items-center gap-1">
            <FaChevronLeft
               className="text-lg cursor-pointer text-primary sm:hidden"
               onClick={() => setCurrentTicket(null)}
            />
            <div className="flex items-center justify-between w-full">
               <section className="flex items-center gap-x-10">
                  <div>
                     <h2 className="text-sm font-medium">Ticket id</h2>
                     <h3 className="text-xs font-medium text-gray-400">{currentTicket?._id}</h3>
                  </div>
               </section>
               {!isTicketClosed && <CloseTicket />}
            </div>
         </div>

         {/* Chat Scroll Area */}
         <Messages />

         {/* Input Area */}
         {isTicketClosed ? (
            <div className="h-[60px] text-sm text-center flex items-center justify-center text-white rounded-lg bg-accent/80 px-6">
               <p>
                  We are writing to inform you that your support ticket has been marked as resolved. If you encounter
                  any further issues related to this matter please create a new ticket.
               </p>
            </div>
         ) : (
            <InputArea />
         )}
      </div>
   );
}
