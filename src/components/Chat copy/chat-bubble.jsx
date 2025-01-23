import React from "react";
import { cn } from "@/lib/utils";
import moment from "moment";
import { HiOutlineDownload } from "react-icons/hi";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useStore } from "@/store";

const ChatBubble = React.forwardRef(({ message: { senderId, message, attachments, createdAt } }, ref) => {
   const currentUser = useStore((state) => state.user);
   const isSender = senderId?._id === currentUser._id;
   const [isDownloaded, setIsDownloaded] = React.useState(false);

   function handleDownload() {
      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 5000);
   }

   const name = senderId?.name ? senderId?.name : "...";

   return (
      <div
         className={cn(
            "max-w-[530px] min-w-[200px] w-max p-3 pb-2 bg-[#F8F9FA]",
            isSender ? "bg-[#B4D6FF] ml-auto rounded-l-xl" : "rounded-r-xl"
         )}
         ref={ref}
      >
         <h3 className={cn("text-xs font-medium mb-1.5", isSender ? "text-[#C12DA9]" : "text-[#C1BB2D] ")}>
            {isSender ? "You" : name}
         </h3>
         {message && <p className="text-sm font-[300] text-black">{message}</p>}
         {attachments && attachments !== "null" && (
            <p
               className={cn(
                  "h-12 text-sm font-medium text-gray-700 bg-[#e4e4e4] rounded px-2 flex items-center gap-2 mb-2 mt-1",
                  isSender && "bg-[#d4e7ff]"
               )}
            >
               Sent an Attachment
               <a
                  href={attachments}
                  download
                  className={cn("hover:bg-[#F8F9FA] rounded p-1 active:bg-green-300", isSender && "hover:bg-[#ecf5ff]")}
                  onClick={handleDownload}
               >
                  {isDownloaded ? (
                     <MdOutlineDownloadDone className="text-xl text-green-600" />
                  ) : (
                     <HiOutlineDownload className="text-xl text-black" />
                  )}
               </a>
            </p>
         )}
         <p className={cn("text-[10px] font-semibold text-right", isSender ? "text-[#4E4949]" : "text-[#A0AEC0]")}>
            {moment(createdAt).fromNow()}
         </p>
      </div>
   );
});

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
