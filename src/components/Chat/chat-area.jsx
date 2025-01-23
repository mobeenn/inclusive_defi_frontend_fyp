"use client";
import { FaChevronLeft } from "react-icons/fa";
import { useStore } from "@/store";
import Messages from "./messages";
import InputArea from "./input-area";
import { useEffect } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import NewMeetingModal from "./new-meeting-modal";
import moment from "moment";

export default function ChatArea() {
   const user = useStore((state) => state.user);
   const currentChat = useStore((state) => state.currentChat);
   const setCurrentChat = useStore((state) => state.setCurrentChat);
   const onlineUsers = useStore((state) => state.onlineUsers);

   let otherUser;

   if (currentChat?.senderId === user?._id) {
      otherUser = currentChat?.receiverDetails;
      if (otherUser) {
         otherUser._id = currentChat?.receiverId;
      }
   } else {
      otherUser = currentChat?.senderDetails;
      if (otherUser) {
         otherUser._id = currentChat?.senderId;
      }
   }

   const name = otherUser?.name ? otherUser?.name : "Email";
   const email = otherUser?.email;
   const role = otherUser?.role;

   const isOnline = onlineUsers?.find((item) => item.userId === otherUser?._id);

   useEffect(() => {
      return () => {
         setCurrentChat(null);
      };
   }, [setCurrentChat]);

   if (currentChat === null) {
      return (
         <div className="ml-[calc(348px+16px)] hidden h-full items-center justify-center rounded-2xl bg-white px-4 py-3 shadow-card sm:flex">
            <h1 className="text-center text-2xl">
               Select a Conversation
               <br />
               OR
               <br />
               Search Investors & Creators
            </h1>
         </div>
      );
   }

   return (
      <div className="h-full rounded-2xl bg-white px-4 py-3 shadow-card sm:ml-[calc(348px+16px)]">
         {/* Header */}
         <div className="flex items-center gap-1">
            <FaChevronLeft
               className="cursor-pointer text-lg text-primary sm:hidden"
               onClick={() => setCurrentChat(null)}
            />
            <div className="flex w-full items-center justify-between">
               <section className="flex gap-4">
                  <div>
                     <h2 className="text-sm font-medium">
                        {name} &middot;{" "}
                        <span className="font-medium text-gray-500">
                           {capitalizeFirstLetter(role)}
                        </span>
                     </h2>
                     <h3 className="text-xs font-medium text-gray-400">
                        {email}
                     </h3>
                  </div>
                  {/* <div>
                     <h2 className="text-sm font-medium">
                        {isOnline?.onlineStatus ? "Online" : "Last Online"}
                     </h2>

                     {!isOnline?.onlineStatus && (
                        <h3 className="text-xs font-medium text-gray-400">
                           {moment(isOnline?.updatedAt).fromNow()}
                        </h3>
                     )}
                  </div> */}
               </section>

               <NewMeetingModal />
            </div>
         </div>

         {/* Chat Scroll Area */}
         <Messages />

         <InputArea />
      </div>
   );
}
