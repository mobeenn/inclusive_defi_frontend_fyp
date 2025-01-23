import { getAllInvestments, getInvestmentsSummary } from "@/api/investments";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export function useGetAllInvestments({ perPage, page }) {
   return useQuery({
      queryKey: ["all-investments", perPage, page],
      queryFn: () => getAllInvestments({ perPage, page }),
      placeholderData: keepPreviousData,
   });
}

export function useGetInvestmentsSummary() {
   return useQuery({
      queryKey: ["investments-summary"],
      queryFn: getInvestmentsSummary,
   });
}
