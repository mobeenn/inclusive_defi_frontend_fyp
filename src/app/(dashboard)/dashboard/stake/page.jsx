"use client";
import { useState } from "react";
import Stake from "@/components/Stake/stake";
import StakeHistory from "@/components/Stake/stake-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/ui/page-loader";
import { isUserVerified } from "@/lib/auth";
import { toast } from "sonner";

export default function Page() {
   const user = useStore((state) => state.user);
   const router = useRouter();
   const [currentTab, setCurrentTab] = useState("stake");

   if (!user) {
      return <PageLoader />;
   } else if (!isUserVerified(user)) {
      toast.error(
         "Your account is currently unverified. Please check your email for the verification link and complete the verification process to proceed with using our services. Thank you.",
      );
      router.push("/dashboard");
   } else
      return (
         <div className="rounded-lg bg-white px-3 py-4 shadow-card sm:rounded-2xl sm:p-[1.75rem]">
            <Tabs
               defaultValue="stake"
               value={currentTab}
               onValueChange={setCurrentTab}
            >
               <div className="flex justify-center">
                  <TabsList className="h-auto rounded-[5px] bg-[#DADADA] p-0 text-accent">
                     <TabsTrigger
                        value="stake"
                        className="h-10 w-[5.625rem] rounded-none rounded-l-[5px] font-poppins text-sm data-[state=active]:bg-accent data-[state=active]:text-white sm:h-[3.125rem] sm:w-[8.625rem]"
                     >
                        Stake
                     </TabsTrigger>
                     <TabsTrigger
                        value="history"
                        className="h-10 w-[5.625rem] rounded-none rounded-r-[5px] font-poppins text-sm data-[state=active]:bg-accent data-[state=active]:text-white sm:h-[3.125rem] sm:w-[8.625rem]"
                     >
                        History
                     </TabsTrigger>
                  </TabsList>
               </div>
               <TabsContent value="stake">
                  <Stake setCurrentTab={setCurrentTab} />
               </TabsContent>
               <TabsContent value="history">
                  <StakeHistory />
               </TabsContent>
            </Tabs>
         </div>
      );
}
