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
import { useState } from "react";
import Image from "next/image";
import Pagination from "@/common/pagination";
import { useGetMyFundedProjects } from "@/data/projects";
import moment from "moment";
import Copy from "@/common/copy";
import { truncateAddress } from "@/lib/utils";

export default function FundingsTable() {
   const [currentPage, setCurrentPage] = useState(1);
   const [perPage, setPerPage] = useState(10);

   const {
      data: { data: fundingData, totalPages } = {},
      isPending,
      isPlaceholderData,
   } = useGetMyFundedProjects({
      limit: perPage,
      page_number: currentPage,
   });

   return (
      <>
         <div className="rounded-lg bg-white px-[22px] py-6 pb-4 shadow-card sm:rounded-2xl">
            <div className="overflow-x-auto">
               <Table className="min-w-[1100px]">
                  <Head>
                     <HeadRow>
                        <HeadData className={"text-left"}>Investor</HeadData>
                        <HeadData>Project Title</HeadData>
                        <HeadData>Launched Date</HeadData>
                        <HeadData>End Date</HeadData>
                        <HeadData>Project Status</HeadData>
                        <HeadData>Invested Amount</HeadData>
                        <HeadData>Hash</HeadData>
                     </HeadRow>
                  </Head>
                  <Body>
                     {isPending && (
                        <Row>
                           <Data colSpan={6}>Loading...</Data>
                        </Row>
                     )}
                     {fundingData?.length === 0 && (
                        <Row>
                           <Data colSpan={6} className="text-center">
                              No Funding Found!
                           </Data>
                        </Row>
                     )}
                     {fundingData?.map((data) => (
                        <TableRow
                           data={data}
                           key={data?._id}
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
            totalPages={totalPages || 1}
            perPage={perPage}
            setPerPage={setPerPage}
         />
      </>
   );
}

function TableRow({ data, className }) {
   const creationDate = new Date(data?.project_details[0]?.createdAt).getTime();
   const durationInDays = data?.project_details[0]?.fundRaisingDuration;
   const endDate = creationDate + durationInDays * 24 * 60 * 60 * 1000;

   return (
      <Row className={className}>
         <Data className="text-left">
            <div className="flex items-center gap-1.5">
               <Image
                  src={
                     data?.investor_detail[0]?.profileImg ||
                     "/assets/images/default-avatar.png"
                  }
                  alt="user"
                  width={40}
                  height={40}
                  className="size-10 rounded-xl"
               />
               {data?.investor_detail[0]?.name}
            </div>
         </Data>
         <Data>{data?.project_details[0]?.projectTitle}</Data>
         <Data>
            {moment(data?.project_details[0]?.createdAt).format(
               "DD MMMM, YYYY",
            )}
         </Data>
         <Data>{moment(endDate).format("DD MMMM, YYYY")}</Data>
         <Data>
            <Status status={data?.project_details[0]?.projectStatus}>
               {data?.project_details[0]?.projectStatus}
            </Status>
         </Data>
         <Data>{data?.investedAmount} BNB</Data>
         <Data>
            {data?.transactionHash && (
               <div className="flex items-center justify-center gap-2">
                  <a
                     href={
                        "https://testnet.bscscan.com/tx/" +
                        data?.transactionHash
                     }
                     target="_blank"
                     className="transition-all hover:text-blue-500"
                  >
                     {truncateAddress(data?.transactionHash)}
                  </a>
                  <Copy text={data?.transactionHash} />
               </div>
            )}
         </Data>
      </Row>
   );
}
