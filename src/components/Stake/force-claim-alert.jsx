import Image from "next/image";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogCancelPrimitive,
   AlertDialogContent,
   AlertDialogFooter,
} from "../ui/alert-dialog";
import { useAccount } from "wagmi";
import { updateStakeHistory } from "@/api/staking";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useStaking } from "@/web3/providers/staking-provider";
import { useState } from "react";

export default function ForceClaimAlert({ item, open, setOpen }) {
   const { address } = useAccount();
   const queryClient = useQueryClient();
   const { readPenaltyPercentage, unstakeToken } = useStaking();

   const [isLoading, setIsLoading] = useState(false);

   async function handleForceClaim() {
      if (!address) {
         toast.error("Please connect your wallet");
         return;
      }
      try {
         setIsLoading(true);

         const penaltyPercentage = await readPenaltyPercentage();
         const penaltyAmount = Math.floor(
            (+item?.staked_amount * penaltyPercentage) / 100,
         );
         const refund_amount = Math.floor(+item?.staked_amount - penaltyAmount);

         console.log("Penalty Amount", penaltyAmount);
         console.log("Staked Amount", item?.staked_amount);
         console.log("Penalty Percentage", Number(penaltyPercentage));
         console.log("Type of per", typeof penaltyPercentage);

         const unstakeRes = await unstakeToken();
         if (!unstakeRes.transactionHash) {
            toast.error("Something went wrong");
            return;
         }

         const res = await updateStakeHistory({
            stakingId: item?._id,
            status: "forced claimed",
            penalty_amount: penaltyAmount,
            refund_amount: refund_amount,
            unstake_hash: unstakeRes.transactionHash,
         });

         queryClient.invalidateQueries("staking-history");

         toast.success("Claimed successfully");
      } catch (error) {
         toast.error("Something went wrong");
         console.log(error);
      } finally {
         setIsLoading(false);
         setOpen(false);
      }
   }

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent className="pb-[64px]">
            <div className="mb-8 flex items-center justify-between">
               <h2 className="font-poppins font-medium uppercase tracking-tight text-[#B0AECC] text-[11.px]">
                  Force Claim
               </h2>
               <AlertDialogCancelPrimitive>
                  <Image
                     src="/assets/icons/alert-cross.svg"
                     alt="close"
                     height={24}
                     width={24}
                  />
               </AlertDialogCancelPrimitive>
            </div>
            <p className="text-center font-poppins font-medium uppercase text-white">
               Are you sure you want to forcefully claim and break your package?
            </p>
            <AlertDialogFooter>
               <AlertDialogAction
                  className="bg-[#FA1C1C]"
                  onClick={handleForceClaim}
                  isLoading={isLoading}
               >
                  Yes
               </AlertDialogAction>
               <AlertDialogCancel>No</AlertDialogCancel>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
