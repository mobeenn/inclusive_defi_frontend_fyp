import { getStakingHistory } from "@/api/staking";
import { useStaking } from "@/web3/providers/staking-provider";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export function useGetUserStakingDetails() {
   const { readUserStakingDetails } = useStaking();
   const { address } = useAccount();

   return useQuery({
      queryKey: ["staking-user-details", address],
      queryFn: readUserStakingDetails,
   });
}

export function useGetStakingHistory({ perPage, page }) {
   const { address } = useAccount();

   return useQuery({
      queryKey: ["staking-history", perPage, page, address],
      queryFn: () => getStakingHistory({ perPage, page, address }),
      placeholderData: keepPreviousData,
   });
}
