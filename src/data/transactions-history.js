import { getTransactionsHistory } from "@/api/transactions-history";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export function useGetTransactionsHistory({ perPage, page, type }) {
   return useQuery({
      queryKey: ["transactions-history", perPage, page, type],
      queryFn: () => getTransactionsHistory({ perPage, page, type }),
      placeholderData: keepPreviousData,
   });
}
