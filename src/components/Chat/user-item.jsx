import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import Image from "next/image";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UserItem({ user, chats, ...props }) {
   const setCurrentChat = useStore((state) => state.setCurrentChat);
   const setChatSearchQuery = useStore((state) => state.setChatSearchQuery);
   const currentUser = useStore((state) => state.user);
   const isActive = false;

   const avatar =
      user?.profileImg && user?.profileImg !== "null"
         ? user?.profileImg
         : "/assets/images/default-avatar.png";

   const iconsSrc =
      user?.role === "investor"
         ? "/assets/icons/investor-icon.svg"
         : "/assets/icons/creator-icon.svg";

   function handleUserClick() {
      const existingChat = chats?.find(
         (chat) =>
            chat?.senderId === user?._id || chat?.receiverId === user?._id,
      );
      if (existingChat) {
         setCurrentChat(existingChat);
         setChatSearchQuery("");
         return;
      }

      setChatSearchQuery("");
      socket.emit("startChat", {
         senderId: currentUser?._id,
         receiverId: user?._id,
      });
   }

   return (
      <div
         className={cn(
            "relative flex h-[60px] cursor-pointer flex-col justify-center gap-1 bg-[#F8F9FA] px-[18px] text-[#718096]",
            isActive && "bg-[#CBE4FD] text-[#303132]",
         )}
         onClick={handleUserClick}
         {...props}
      >
         <div className="flex items-center gap-2.5">
            <Image
               src={avatar}
               alt={"user"}
               width={30}
               height={30}
               className="aspect-square rounded-full object-cover"
            />
            <div className="flex w-full items-center justify-between">
               <div>
                  <h3 className="text-sm text-gray-900">{user?.name}</h3>
                  <h4 className="-mt-0.5 text-xs">{user?.email}</h4>
               </div>

               <TooltipProvider delayDuration={200}>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Image src={iconsSrc} width={18} height={18} alt="in" />
                     </TooltipTrigger>
                     <TooltipContent className="border-none bg-accent font-medium text-white">
                        <p className="flex items-center gap-1">{user?.role}</p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </div>
         </div>
      </div>
   );
}
