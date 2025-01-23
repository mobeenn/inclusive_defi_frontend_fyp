"use client";
import SupportSidebar from "@/components/Support/support-sidebar";
import NewTicketModal from "@/components/Support/new-ticket-modal";
import ChatArea from "@/components/Support/chat-area";
import PageLoader from "@/components/ui/page-loader";
import { isUserVerified } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { toast } from "sonner";

export default function Support() {
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
         <>
            <div className="mb-3 flex items-center justify-between xl:mb-5">
               <h2>Customer Service</h2>
               <NewTicketModal />
            </div>
            <div className="chat-sidebar-scroll relative h-[calc(100svh-152px)] xl:h-[calc(100svh-180px)]">
               <SupportSidebar />
               <ChatArea />
            </div>
         </>
      );
}
