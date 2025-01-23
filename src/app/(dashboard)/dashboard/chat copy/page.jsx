"use client";
import CardTitle from "@/common/card-title";
import Input from "@/common/input";
import ChatBubble from "@/components/Chat/chat-bubble";
import ChatSidebar from "@/components/Chat/chat-sidebar";
import { useState } from "react";
import { IoIosAttach } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import Image from "next/image";

export default function Chat() {
   const [currentChat, setCurrentChat] = useState(null);
   const handleChatChange = (id) => {
      setCurrentChat(id);
   };
   return (
      <>
         <div className="relative h-[calc(100svh-110px)] xl:h-[calc(100svh-124px)] chat-sidebar-scroll">
            <ChatSidebar
               handleChatChange={handleChatChange}
               currentChat={currentChat}
            />

            {currentChat === null ? (
               <div className="h-full px-4 py-3 bg-white shadow-card rounded-2xl sm:ml-[calc(348px+16px)] flex items-center justify-center">
                  <h1 className="text-2xl">Select A Conversation</h1>
               </div>
            ) : (
               <div className="relative h-full px-4 py-3 bg-white shadow-card rounded-2xl sm:ml-[calc(348px+16px)]">
                  <button className="bg-[#ECECEC] hover:bg-[#ECECEC]/70 active:bg-[#ECECEC] rounded-full  size-11 absolute top-[14px] right-[14px] flex items-center justify-center transition-all">
                     <Image
                        src="/assets/icons/meets-icon.png"
                        alt="G"
                        width={24}
                        height={24}
                     />
                  </button>
                  <div className="flex items-center gap-1">
                     <FaChevronLeft
                        className="text-lg cursor-pointer text-primary sm:hidden"
                        onClick={() => setCurrentChat(null)}
                     />
                     <CardTitle>Muhammad Asim</CardTitle>
                  </div>
                  {/* Chat Scroll Area */}
                  <div className="h-[calc(100svh-236px)] xl:h-[calc(100svh-250px)] mt-6 space-y-3 overflow-y-auto">
                     <ChatBubble
                        sender={"Muhammad Asim"}
                        message={"Hi, are you there?"}
                        time={"30 March 2020"}
                     />
                     <ChatBubble
                        sender={"Ihtisham"}
                        message={"Hey, yes I'm here, how can I help you?"}
                        time={"30 March 2020"}
                     />
                  </div>
                  {/* Input Area */}
                  <div className="flex items-center gap-2 py-2 bg-white">
                     <label className="flex items-center justify-center p-1 text-2xl transition-all bg-gray-100 rounded-full cursor-pointer text-accent-dark hover:bg-gray-200 active:bg-gray-100 size-11 shrink-0">
                        <input type="file" className="hidden" />
                        <IoIosAttach />
                     </label>
                     <div className="relative w-full">
                        <Input
                           placeholder="Type a message"
                           className="flex-1 w-full h-10 text-base rounded-full focus:ring-0"
                        />

                        <button className="font-normal text-lg flex items-center justify-center text-[#020C29] rounded-full size-8 absolute top-1/2 right-3 -translate-y-1/2">
                           <BsSendFill />
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}
