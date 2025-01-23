"use client";
import BuySellTable from "@/components/History/buy-sell-table";
import DefiTable from "@/components/History/defi-table";
import PageLoader from "@/components/ui/page-loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isUserVerified } from "@/lib/auth";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function History() {
   const user = useStore((state) => state.user);
   const router = useRouter();

   if (!user) {
      return <PageLoader />;
   } else if (!isUserVerified(user)) {
      toast.error(
         "Your account is currently unverified. Please check your email for the verification link and complete the verification process to proceed with using our services. Thank you.",
      );
      router.push("/dashboard");
   } else
      return (
         <Tabs defaultValue="buy-sell">
            <div className="flex justify-center">
               <TabsList className="h-auto rounded-[5px] bg-[#DADADA] p-0 text-accent">
                  <TabsTrigger
                     value="buy-sell"
                     className="h-10 w-[5.625rem] rounded-none rounded-l-[5px] font-poppins text-sm data-[state=active]:bg-accent data-[state=active]:text-white sm:h-[3.125rem] sm:w-[8.625rem]"
                  >
                     Buy/Sell
                  </TabsTrigger>
                  <TabsTrigger
                     value="defi"
                     className="h-10 w-[5.625rem] rounded-none rounded-r-[5px] font-poppins text-sm data-[state=active]:bg-accent data-[state=active]:text-white sm:h-[3.125rem] sm:w-[8.625rem]"
                  >
                     Defi
                  </TabsTrigger>
               </TabsList>
            </div>
            <TabsContent value="buy-sell">
               <BuySellTable />
            </TabsContent>
            <TabsContent value="defi">
               <DefiTable />
            </TabsContent>
         </Tabs>
      );
}
