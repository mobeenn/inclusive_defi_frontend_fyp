"use client";
import ChatArea from "@/components/Chat/chat-area";
import ChatSidebar from "@/components/Chat/chat-sidebar";
import ChatSocketProvider from "@/components/Chat/chat-socket-provider";
import PageLoader from "@/components/ui/page-loader";
import { isUserVerified } from "@/lib/auth";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Chat() {
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
         // <ChatSocketProvider>
         <div className="chat-sidebar-scroll relative h-[calc(100svh-108px)] xl:h-[calc(100svh-128px)]">
            <ChatSidebar />
            <ChatArea />
         </div>
         // </ChatSocketProvider>
      );
}
