import { useQuery } from "@tanstack/react-query";

export function useGetAllNotifications() {
   return useQuery({
      queryKey: ["ticket-messages", ticketId],
      queryFn: () => getAllTicketMessages({ ticketId }),
      staleTime: twentyFourHoursInMs,
   });
}
