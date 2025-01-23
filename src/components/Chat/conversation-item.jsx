import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import Image from "next/image";
import moment from "moment";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ConversationItem({ chat, ...props }) {
   const currentChat = useStore((state) => state.currentChat);
   const user = useStore((state) => state.user);
   const newMessages = useStore((state) => state.newMessages);
   const onlineUsers = useStore((state) => state.onlineUsers);

   const newMessagesCount = newMessages.filter(
      (message) => message.chatId === chat?._id,
   ).length;

   let otherUser;

   if (chat?.senderId === user?._id) {
      otherUser = chat?.receiverDetails;
      if (otherUser) {
         otherUser._id = chat?.receiverId;
      }
   } else {
      otherUser = chat?.senderDetails;
      if (otherUser) {
         otherUser._id = chat?.senderId;
      }
   }

   const avatar = otherUser?.profileImg;
   const name = otherUser?.name ? otherUser?.name : otherUser?.email;
   const iconsSrc =
      otherUser?.role === "investor"
         ? "/assets/icons/investor-icon.svg"
         : "/assets/icons/creator-icon.svg";

   const isActive = currentChat?._id === chat?._id;

   const src =
      avatar && avatar !== "null"
         ? avatar
         : "/assets/images/default-avatar.png";

   const isOnline = onlineUsers?.find(
      (item) => item.userId === otherUser?._id && item.onlineStatus === true,
   );

   return (
      <div
         className={cn(
            "relative flex h-[60px] cursor-pointer flex-col justify-center gap-1 bg-[#F8F9FA] px-[18px] text-[#718096]",
            isActive && "bg-[#CBE4FD] text-[#303132]",
         )}
         {...props}
      >
         <div className="flex items-center gap-1.5">
            <div className="relative">
               <Image
                  src={src}
                  alt={"user"}
                  width={30}
                  height={30}
                  className="aspect-square rounded-full object-cover"
               />
               {/* {isOnline && (
                  <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500" />
               )} */}
            </div>
            <h3 className="truncate">{name}</h3>
         </div>
         {/* Time */}
         <p className="absolute bottom-1.5 right-3 text-[10px] text-[#D8A353]">
            {moment(chat?.createdAt).format("MMMM Do YYYY")}
         </p>
         {currentChat?._id !== chat?._id && newMessagesCount > 0 && (
            <p className="absolute right-8 top-3.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white">
               {newMessagesCount}
            </p>
         )}

         {/* Role Icon */}
         <TooltipProvider delayDuration={200}>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Image
                     src={iconsSrc}
                     width={18}
                     height={18}
                     alt="in"
                     className="absolute right-2 top-3"
                  />
               </TooltipTrigger>
               <TooltipContent className="border-none bg-accent font-medium text-white">
                  <p className="flex items-center gap-1">{otherUser?.role}</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </div>
   );
}
