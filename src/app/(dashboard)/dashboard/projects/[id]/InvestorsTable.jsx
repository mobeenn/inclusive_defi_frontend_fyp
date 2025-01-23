"use client";
import CardTitle from "@/common/card-title";
import PageLoader from "@/components/ui/page-loader";
import {
   Table,
   Head,
   Body,
   HeadRow,
   Row,
   Data,
   HeadData,
} from "@/components/ui/table";
import { isUserVerified } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function InvestorsTable({ investors }) {
   const user = useStore((state) => state.user);
   const router = useRouter();

   if (!user) {
      return <PageLoader />;
   } else if (!isUserVerified(user)) {
      router.push("/");
   } else
      return (
         <div
            className={cn(
               "relative basis-[65%] rounded-[5px] bg-white p-6 pb-4 shadow-[0px_7px_23px_0px_#0000000D]",
               user?.role === "investor" && "flex-1",
            )}
         >
            <CardTitle className="mb-4 pl-2">Investors</CardTitle>
            <div className="overflow-x-auto">
               <Table className="min-w-[38rem] md:min-w-[25rem]">
                  <Head>
                     <HeadRow>
                        <HeadData className="text-left">Investor Name</HeadData>
                        <HeadData className="text-left">Email Address</HeadData>
                        <HeadData>Invested Amount</HeadData>
                     </HeadRow>
                  </Head>
                  <Body>
                     {investors?.length === 0 && (
                        <Row>
                           <Data colSpan={3} className="text-center">
                              No funding received yet.
                           </Data>
                        </Row>
                     )}
                     {investors?.map((data) => (
                        <Row key={data.id}>
                           <Data className="text-left">
                              <div className="flex items-center gap-1.5">
                                 <Image
                                    src={
                                       data?.user_detail[0]?.profileImg ||
                                       "/assets/images/default-avatar.png"
                                    }
                                    alt="user"
                                    width={40}
                                    height={40}
                                    className="size-10 rounded-xl"
                                 />
                                 {data?.user_detail[0]?.name}
                              </div>
                           </Data>
                           <Data className="text-left">
                              {data?.user_detail[0]?.email}
                           </Data>
                           <Data>{data.investedAmount} BNB</Data>
                        </Row>
                     ))}
                  </Body>
               </Table>
            </div>
         </div>
      );
}
