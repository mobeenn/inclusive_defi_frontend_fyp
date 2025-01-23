"use client";
import { useMemo, useState } from "react";
import Pagination from "@/common/pagination";
import {
   Table,
   Head,
   HeadRow,
   Body,
   Row,
   Data,
   HeadData,
   Status,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useGetStakingHistory } from "@/data/staking";
import Copy from "@/common/copy";
import moment from "moment";
import { capitalizeFirstLetter, truncateAddress } from "@/lib/utils";
import { useAccount } from "wagmi";
import { useStaking } from "@/web3/providers/staking-provider";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ForceClaimAlert from "./force-claim-alert";
import useCalculateDuration from "@/hooks/useCalculateDuration";
import { updateStakeHistory } from "@/api/staking";

export default function StakeHistory() {
   const { address } = useAccount();

   const [currentPage, setCurrentPage] = useState(1);
   const [perPage, setPerPage] = useState(10);

   const {
      data: { data: history, count = 0 } = {},
      isPending,
      isPlaceholderData,
   } = useGetStakingHistory({ page: currentPage, perPage });

   const totalStackedAmount = history?.reduce((acc, item) => {
      return acc + Number(item?.staked_amount);
   }, 0);

   const totalRewardAmount = history?.reduce((acc, item) => {
      return acc + Number(item?.reward_amount);
   }, 0);

   return (
      <div>
         <div className="mt-8 overflow-x-auto">
            <Table className="min-w-[1400px]">
               <Head>
                  <HeadRow>
                     <HeadData className={"text-left"}>Stack Hash</HeadData>
                     <HeadData>Stack Amount</HeadData>
                     <HeadData>Refund Amount</HeadData>
                     <HeadData>Reward Amount</HeadData>
                     <HeadData>Penalty Amount</HeadData>
                     <HeadData>Package</HeadData>
                     <HeadData>Wallet Address</HeadData>
                     <HeadData>Stacked Date</HeadData>
                     <HeadData>Timer</HeadData>
                     <HeadData>UnStack Hash</HeadData>
                     <HeadData>Status</HeadData>
                     <HeadData>Claim</HeadData>
                  </HeadRow>
               </Head>
               <Body>
                  {isPending && (
                     <Row>
                        <Data colSpan={12}>Loading...</Data>
                     </Row>
                  )}
                  {history?.length === 0 && (
                     <Row>
                        <Data colSpan={12}>No Staking history Found!</Data>
                     </Row>
                  )}
                  {history?.map((item) => (
                     <TableRow
                        key={item?._id}
                        item={item}
                        address={address}
                        className={
                           isPlaceholderData && "pointer-events-none opacity-50"
                        }
                     />
                  ))}
               </Body>
            </Table>
         </div>

         <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={count}
            perPage={perPage}
            setPerPage={setPerPage}
         />

         {/* <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <p className="font-poppins font-medium text-accent">
               Total Amount Stacked:{" "}
               <span className="text-nowrap rounded-[5px] bg-accent px-3 py-2 text-sm font-semibold text-white">
                  {totalStackedAmount} INCD
               </span>
            </p>
            <p className="font-poppins font-medium text-accent">
               Total Amount Claimed:{" "}
               <span className="text-nowrap rounded-[5px] bg-accent px-3 py-2 text-sm font-semibold text-white">
                  {totalRewardAmount} INCD
               </span>
            </p>
         </div> */}
      </div>
   );
}

function TableRow({ item, className, address }) {
   const queryClient = useQueryClient();
   const duration = useCalculateDuration(item?.staking_end_time);
   const { readRewardPercentage, unstakeToken } = useStaking();

   const [isForceClaimAlertOpen, setIsForceClaimAlertOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const isTimeUp = useMemo(() => {
      const isTimeUp = moment().isAfter(moment(item?.staking_end_time));
      return isTimeUp;
   }, [item?.staking_end_time]);

   const canClaim = useMemo(() => {
      return !!(address && item?.status === "active");
   }, [address, item?.status]);

   async function handleUnstakeToken() {
      if (!address) {
         toast.error("Please connect your wallet");
         return;
      }
      try {
         setIsLoading(true);

         const rewardPercentage = await readRewardPercentage(+item?.package);
         const rewardAmount = Math.floor(
            (+item?.staked_amount * rewardPercentage) / 100,
         );

         const unstakeRes = await unstakeToken();
         if (!unstakeRes.transactionHash) {
            toast.error("Something went wrong");
            return;
         }

         const res = await updateStakeHistory({
            stakingId: item?._id,
            status: "claimed",
            reward_amount: rewardAmount,
            unstake_hash: unstakeRes.transactionHash,
         });

         queryClient.invalidateQueries("staking-history");

         toast.success("Claimed successfully");
      } catch (error) {
         toast.error("Something went wrong");
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   }

   function handleForceClick() {
      if (!address) {
         toast.error("Please connect your wallet");
         return;
      }
      setIsForceClaimAlertOpen(true);
   }

   const statusColor =
      item?.status === "active"
         ? "yellow"
         : item?.status === "claimed"
           ? "green"
           : "red";

   return (
      <>
         <Row className={className}>
            <Data className="flex items-center gap-2 text-left">
               <a
                  href={"https://testnet.bscscan.com/tx/" + item?.Hash}
                  target="_blank"
                  className="transition-all hover:text-blue-500"
               >
                  {truncateAddress(item?.Hash)}
               </a>
               <Copy text={item?.Hash} />
            </Data>
            <Data>{item?.staked_amount} INCD</Data>
            <Data>{item?.refund_amount || 0} INCD</Data>
            <Data>{item?.reward_amount || 0} INCD</Data>
            <Data>{item?.penalty_amount || 0} INCD</Data>
            <Data>{item?.package}</Data>
            <Data className="flex items-center justify-center gap-2">
               {truncateAddress(item?.wallet_address)}
               <Copy text={item?.wallet_address} />
            </Data>
            <Data>
               {moment(item?.staking_start_time).format("D MMMM, YYYY")}
            </Data>
            {/* <Data>4m 22d 11h 58m 28s</Data> */}
            <Data>{duration}</Data>
            <Data className="flex items-center justify-center gap-2">
               {item?.unstake_hash && (
                  <>
                     <a
                        href={
                           "https://testnet.bscscan.com/tx/" +
                           item?.unstake_hash
                        }
                        target="_blank"
                        className="transition-all hover:text-blue-500"
                     >
                        {truncateAddress(item?.unstake_hash)}
                     </a>
                     <Copy text={item?.unstake_hash} />
                  </>
               )}
            </Data>

            <Data>
               <Status status={statusColor}>
                  {capitalizeFirstLetter(item?.status)}
               </Status>
            </Data>

            <Data className="flex gap-2 py-1">
               <Button
                  size="sm"
                  disabled={isTimeUp || !canClaim}
                  onClick={handleForceClick}
               >
                  Force Claim
               </Button>
               <Button
                  size="sm"
                  disabled={!isTimeUp || !canClaim}
                  loading={isLoading}
                  onClick={handleUnstakeToken}
               >
                  Claim
               </Button>
            </Data>
         </Row>

         <ForceClaimAlert
            item={item}
            open={isForceClaimAlertOpen}
            setOpen={setIsForceClaimAlertOpen}
         />
      </>
   );
}
