"use client";
import { cn } from "@/lib/utils";
import ConversationItem from "./conversation-item";
import { useGetFilteredTickets } from "@/data/tickets";
import { useStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function SupportSidebar() {
   const currentTicket = useStore((state) => state.currentTicket);
   const setCurrentTicket = useStore((state) => state.setCurrentTicket);

   return (
      <div className={cn("h-full max-w-[348px] w-full absolute left-0 top-0", currentTicket && "hidden sm:block")}>
         <div className="px-4 py-3 bg-white rounded-2xl shadow-card">
            {/* <SearchInput /> */}
            <Tabs defaultValue="all">
               <div className="flex justify-center">
                  <TabsList className="mx-auto">
                     <TabsTrigger value="all">All</TabsTrigger>
                     <TabsTrigger value="open">Open</TabsTrigger>
                     <TabsTrigger value="closed">Closed</TabsTrigger>
                  </TabsList>
               </div>
               <TabsContent value="all">
                  <TicketList value="all" setCurrentTicket={setCurrentTicket} />
               </TabsContent>
               <TabsContent value="open">
                  <TicketList value="open" setCurrentTicket={setCurrentTicket} />
               </TabsContent>
               <TabsContent value="closed">
                  <TicketList value="closed" setCurrentTicket={setCurrentTicket} />
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}

function TicketList({ value, setCurrentTicket }) {
   const { data: tickets, isLoading } = useGetFilteredTickets({ searchQuery: value });

   return (
      <div className="h-[calc(100svh-228px)] xl:h-[calc(100svh-256px)] overflow-y-auto space-y-3 mt-3">
         {isLoading && <div className="text-center">Loading...</div>}
         {tickets?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
               <Image src="/assets/icons/no-data.svg" alt="No data" width={100} height={100} />
               <p className="font-medium text-gray-800">No Ticket Found!</p>
            </div>
         )}
         {tickets?.map((ticket) => (
            <ConversationItem
               key={ticket?._id}
               id={ticket?._id}
               name={ticket?.subject}
               avatar={ticket?.userId?.profileImg}
               date={ticket?.createdAt}
               onClick={() => setCurrentTicket(ticket)}
            />
         ))}
      </div>
   );
}
