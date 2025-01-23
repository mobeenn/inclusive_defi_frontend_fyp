"use client";
import {
   Table,
   Head,
   HeadRow,
   Body,
   Row,
   Data,
   HeadData,
} from "@/components/ui/table";
import CardTitle from "@/common/card-title";
import { useState } from "react";
import moment from "moment";
import Pagination from "@/common/pagination";
import { truncateAddress } from "@/lib/utils";
import { useGetTransactionsHistory } from "@/data/transactions-history";
import Copy from "@/common/copy";

export default function BuySellTable() {
   const [currentPage, setCurrentPage] = useState(1);
   const [perPage, setPerPage] = useState(10);

   const {
      data: { data: history, count = 0 } = {},
      isPending,
      isPlaceholderData,
   } = useGetTransactionsHistory({ page: currentPage, perPage, type: "token" });

   return (
      <>
         <div className="rounded-lg bg-white px-[22px] py-6 pb-4 shadow-card sm:rounded-2xl">
            <CardTitle className="mb-4 pl-2">Buy/Sell History</CardTitle>
            <div className="overflow-x-auto">
               <Table className="min-w-[1000px]">
                  <Head>
                     <HeadRow>
                        <HeadData className={"text-left"}>Hash</HeadData>
                        <HeadData>Value</HeadData>
                        <HeadData>Symbol</HeadData>
                        <HeadData>Wallet Address</HeadData>
                        <HeadData>Created At</HeadData>
                     </HeadRow>
                  </Head>
                  <Body>
                     {isPending && (
                        <Row>
                           <Data colSpan={8}>Loading...</Data>
                        </Row>
                     )}
                     {history?.length === 0 && (
                        <Row>
                           <Data colSpan={8}>No transaction Found!</Data>
                        </Row>
                     )}
                     {history?.map((item) => (
                        <TableRow
                           key={item?._id}
                           item={item}
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
            totalPages={count}
            perPage={perPage}
            setPerPage={setPerPage}
         />
      </>
   );
}

function TableRow({ item, className }) {
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
            <Data>{item?.amount}</Data>
            <Data>{item?.symbol}</Data>
            <Data className="flex items-center justify-center gap-2">
               {truncateAddress(item?.wallet_address)}
               <Copy text={item?.wallet_address} />
            </Data>
            <Data>{moment(item?.createdAt).format("D MMMM, YYYY")}</Data>
         </Row>
      </>
   );
}
