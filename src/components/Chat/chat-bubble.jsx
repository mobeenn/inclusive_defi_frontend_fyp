import React from "react";
import { cn } from "@/lib/utils";
import moment from "moment";
import { HiOutlineDownload } from "react-icons/hi";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useStore } from "@/store";

const ChatBubble = React.forwardRef(
   (
      { message: { senderId, message, attachments, isMeetingLink, createdAt } },
      ref,
   ) => {
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
               "w-max min-w-[200px] max-w-[530px] bg-[#F8F9FA] p-3 pb-2",
               isSender ? "ml-auto rounded-l-xl bg-[#B4D6FF]" : "rounded-r-xl",
            )}
            ref={ref}
         >
            <h3
               className={cn(
                  "mb-1.5 text-xs font-medium",
                  isSender ? "text-[#C12DA9]" : "text-[#C1BB2D]",
               )}
            >
               {isSender ? "You" : name}
            </h3>
            {message && !isMeetingLink && (
               <p className="text-sm font-[300] text-black">{message}</p>
            )}
            {attachments && attachments !== "null" && (
               <p
                  className={cn(
                     "mb-2 mt-1 flex h-12 items-center gap-2 rounded bg-[#e4e4e4] px-2 text-sm font-medium text-gray-700",
                     isSender && "bg-[#d4e7ff]",
                  )}
               >
                  Sent an Attachment
                  <a
                     href={attachments}
                     download
                     className={cn(
                        "rounded p-1 hover:bg-[#F8F9FA] active:bg-green-300",
                        isSender && "hover:bg-[#ecf5ff]",
                     )}
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
            {isMeetingLink && (
               <>
                  <p className="mb-2 text-sm font-medium text-gray-700">
                     Meeting Scheduled.
                  </p>
                  <a
                     href={message}
                     target="_blank"
                     className="rounded bg-blue-600 px-3 py-1 font-medium text-white"
                  >
                     Join
                  </a>
               </>
            )}
            <p
               className={cn(
                  "text-right text-[10px] font-semibold",
                  isSender ? "text-[#4E4949]" : "text-[#A0AEC0]",
               )}
            >
               {moment(createdAt).fromNow()}
            </p>
         </div>
      );
   },
);

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
