import { getAllTicketMessages, filterTickets } from "@/api/tickets";
import { useQuery } from "@tanstack/react-query";

export function useGetFilteredTickets({ searchQuery }) {
   return useQuery({
      queryKey: ["tickets", searchQuery],
      queryFn: () => filterTickets({ searchQuery }),
   });
}

export function useGetTicketMessages({ ticketId }) {
   return useQuery({
      queryKey: ["ticket-messages", ticketId],
      queryFn: () => getAllTicketMessages({ ticketId }),
   });
}
