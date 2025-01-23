import { useCrowdFunding } from "@/web3/providers/crowd-funding-provider";
import { useIco } from "@/web3/providers/ico-provider";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export function useGetBalance({ userAddress }) {
   const { readBalance } = useIco();

   return useQuery({
      queryKey: ["ico-balance", userAddress],
      queryFn: () => readBalance(userAddress),
   });
}

export function useGetBuyPrice() {
   const { readBuyPrice } = useIco();
   const { address } = useAccount();

   return useQuery({
      queryKey: ["ico-buy-price", address],
      queryFn: readBuyPrice,
   });
}

export function useGetBuyPriceInWei() {
   const { readBuyPriceInWei } = useIco();
   const { address } = useAccount();

   return useQuery({
      queryKey: ["ico-buy-price-in-wei", address],
      queryFn: readBuyPriceInWei,
   });
}

export function useGetSystemFeeInWei() {
   const { readSystemFeeInWei } = useCrowdFunding();
   const { address } = useAccount();

   return useQuery({
      queryKey: ["system-fee-in-wei", address],
      queryFn: readSystemFeeInWei,
   });
}

export function useGetOwner() {
   const { readOwner } = useIco();

   return useQuery({
      queryKey: ["ico-owner"],
      queryFn: readOwner,
   });
}
