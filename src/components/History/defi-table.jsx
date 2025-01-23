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
} from "@/components/ui/table";
import CardTitle from "@/common/card-title";
import { useEffect, useState } from "react";
// import UsersFilters from "@/components/Users/filters";
// import { useGetAllUsers } from "@/data/users";
import moment from "moment";
import Pagination from "@/common/pagination";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useStore } from "@/store";
import { GoEye } from "react-icons/go";

export default function DefiTable() {
   // const historyFilters = useStore((state) => state.historyFilters);
   // const [currentPage, setCurrentPage] = useState(1);
   // const [perPage, setPerPage] = useState(10);

   // const {
   //    data: { data: users, totalPages = 0 } = {},
   //    isPending,
   //    isPlaceholderData,
   // } = useGetAllUsers(currentPage, perPage);

   // useEffect(() => {
   //    setCurrentPage(1);
   // }, [historyFilters]);

   return (
      <>
         {/* <UsersFilters /> */}

         {/* Active Users Table */}
         <div className="rounded-lg bg-white px-[22px] py-6 pb-4 shadow-card sm:rounded-2xl">
            <CardTitle className="mb-4 pl-2">Defi History</CardTitle>
            <div className="overflow-x-auto">
               <Table className="min-w-[1000px]">
                  <Head>
                     <HeadRow>
                        <HeadData className={"text-left"}>Hash</HeadData>
                        <HeadData>Loan Amount</HeadData>
                        <HeadData>Loan Symbol</HeadData>
                        <HeadData>Hold Asset Amount</HeadData>
                        <HeadData>Hold Asset Symbol</HeadData>
                        <HeadData>Loan Return End Time</HeadData>
                        <HeadData>Loan Get Time</HeadData>
                        <HeadData>Created At</HeadData>
                     </HeadRow>
                  </Head>
                  <Body>
                     {/* {isPending && (
                        <Row>
                           <Data colSpan={8}>Loading...</Data>
                        </Row>
                     )}
                     {users?.length === 0 && (
                        <Row>
                           <Data colSpan={8}>No User Found!</Data>
                        </Row>
                     )}
                     {users?.map((user) => (
                        <TableRow
                           key={user?._id}
                           user={user}
                           className={
                              isPlaceholderData &&
                              "pointer-events-none opacity-50"
                           }
                        />
                     ))} */}
                  </Body>
               </Table>
            </div>
         </div>

         {/* Pagination */}
         {/* <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            perPage={perPage}
            setPerPage={setPerPage}
         /> */}
      </>
   );
}

function TableRow({ item, className }) {
   return (
      <>
         <Row className={className}>
            {/* <Data className="text-left">
               <div className="flex items-center gap-1.5">
                  <Image
                     src={profileImgSrc}
                     alt="user"
                     width={80}
                     height={80}
                     className="aspect-square size-10 shrink-0 rounded-xl object-cover"
                  />
                  {user?.name}
               </div>
            </Data>
            <Data>
               <p className="flex items-center justify-center gap-1">
                  {user?.email}
                  {user?.verification?.verifiedEmail && (
                     <EmailVerifiedTooltip />
                  )}
               </p>
            </Data>
            <Data>{capitalizeFirstLetter(user?.role)}</Data>
            <Data>{moment(user?.createdAt).format("D MMMM, YYYY")}</Data>
            <Data>
               <StatusSelect value={kycStatus} onChange={handleKycChange}>
                  <option value={"approved"}>Approved</option>
                  <option value={"pending"}>Pending</option>
                  <option value={"under-review"}>Under Review</option>
                  <option value={"rejected"}>Rejected</option>
               </StatusSelect>
            </Data>
            <Data>
               <StatusSelect value={userStatus} onChange={handleStatusChange}>
                  <option value={"active"}>Active</option>
                  <option value={"blocked"}>Blocked</option>
                  <option value={"deactivated"}>Deactivated</option>
               </StatusSelect>
            </Data>
            <Data>
               {moment(user?.lastActiveTime).format("D MMMM YYYY, h:mm A")}
            </Data>
            <Data className="w-[25px] text-right">
               <ActionButton
                  tooltip="View Details"
                  onClick={() => handleView(user)}
                  icon={GoEye}
               />
            </Data> */}
         </Row>
      </>
   );
}
