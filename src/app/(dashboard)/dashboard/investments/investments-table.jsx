"use client";
import Image from "next/image";
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
import { useGetAllInvestments } from "@/data/investments";
import Pagination from "@/common/pagination";
import { useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useGetWeb3Project } from "@/data/projects";
import { useCrowdFunding } from "@/web3/providers/crowd-funding-provider";
import { toast } from "sonner";
import Copy from "@/common/copy";
import { truncateAddress } from "@/lib/utils";

export default function InvestmentsTable() {
   const [currentPage, setCurrentPage] = useState(1);
   const [perPage, setPerPage] = useState(10);

   const {
      data: { data: investments, count } = {},
      isPending,
      isPlaceholderData,
   } = useGetAllInvestments({
      perPage,
      page: currentPage,
   });

   // console.log("🚀 ~ InvestmentsTable ~ investments:", investments);

   return (
      <>
         <div className="rounded-lg bg-white px-[22px] py-6 pb-4 shadow-card sm:rounded-2xl">
            <div className="overflow-x-auto">
               <Table className="min-w-[1000px]">
                  <Head>
                     <HeadRow>
                        <HeadData className={"text-left"}>
                           Project Holder
                        </HeadData>
                        <HeadData>Project Title</HeadData>
                        <HeadData>Launched Date</HeadData>
                        <HeadData>Status</HeadData>
                        <HeadData>Amount Invested</HeadData>
                        <HeadData>ICO Tokens</HeadData>
                        <HeadData>Hash</HeadData>
                        <HeadData>Action</HeadData>
                     </HeadRow>
                  </Head>
                  <Body>
                     {isPending && (
                        <Row>
                           <Data colSpan={6}>Loading...</Data>
                        </Row>
                     )}
                     {investments?.length === 0 && (
                        <Row>
                           <Data colSpan={6} className="text-center">
                              No Investment Found!
                           </Data>
                        </Row>
                     )}
                     {investments?.map((data) => (
                        <TableRow
                           key={data?._id}
                           data={data}
                           className={
                              isPlaceholderData &&
                              "pointer-events-none opacity-50"
                           }
                        />
                     ))}
                  </Body>
               </Table>
            </div>
         </div>

         {/* Pagination */}
         <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={count || 1}
            perPage={perPage}
            setPerPage={setPerPage}
         />
      </>
   );
}

function TableRow({ data, className }) {
   const { address } = useAccount();
   const { refund } = useCrowdFunding();
   const { data: web3Project } = useGetWeb3Project(
      data?.projectId?._id,
      address,
   );

   const [isRefunding, setIsRefunding] = useState(false);

   async function handleRefund() {
      if (!address) {
         toast.error("Please connect your wallet.");
         return;
      }
      if (!canRefund()) {
         toast.error("You can't refund yet!");
         return;
      }
      try {
         setIsRefunding(true);
         const contractRes = await refund(data?.projectId?._id);
         toast.success("Funds refunded successfully");
      } catch (error) {
         toast.error("Something went wrong!");
         console.log(error);
      } finally {
         setIsRefunding(false);
      }
   }

   function canRefund() {
      if (!web3Project) return false;

      const {
         refundApproval,
         isRefunded,
         fundNeeded,
         totalFunds,
         fundRaisingDuration,
      } = web3Project;

      const isGoalReached = fundNeeded >= totalFunds;
      const isTimeUp = moment().isAfter(moment(Number(fundRaisingDuration)));

      return (
         isGoalReached && isTimeUp && !isRefunded && refundApproval && address
      );
   }

   // console.log("🚀 ~ TableRow ~ web3Project:", web3Project);

   const profileSrc = data?.projectOwnerId?.profileImg
      ? data?.projectOwnerId?.profileImg
      : "/assets/images/default-avatar.png";

   return (
      <Row className={className}>
         <Data className="text-left">
            <div className="flex items-center gap-1.5">
               <Image
                  src={profileSrc}
                  alt="user"
                  width={40}
                  height={40}
                  className="aspect-square size-10 shrink-0 rounded-xl object-cover"
               />
               {data?.projectOwnerId?.name}
            </div>
         </Data>
         <Data>{data?.projectId?.projectTitle}</Data>
         <Data>
            {moment(data?.projectId?.createdAt).format("DD MMMM, YYYY")}
         </Data>
         <Data>
            <Status status={data?.projectId?.projectStatus}>
               {data?.projectId?.projectStatus}
            </Status>
         </Data>
         <Data>{data?.investedAmount + " " + data?.symbol}</Data>
         <Data>{data?.ICO_tokens} INCD</Data>
         <Data>
            <div className="flex items-center justify-center gap-2">
               <a
                  href={
                     "https://testnet.bscscan.com/tx/" + data?.transactionHash
                  }
                  target="_blank"
                  className="transition-all hover:text-blue-500"
               >
                  {truncateAddress(data?.transactionHash)}
               </a>
               <Copy text={data?.transactionHash} />
            </div>
         </Data>
         <Data>
            <Button
               size="sm"
               disabled={!canRefund()}
               loading={isRefunding}
               onClick={handleRefund}
               className="text-xs active:scale-95"
            >
               Refund
            </Button>
         </Data>
      </Row>
   );
}
