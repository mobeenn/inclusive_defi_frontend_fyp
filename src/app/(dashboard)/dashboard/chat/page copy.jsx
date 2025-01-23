"use client";
import CardTitle from "@/common/card-title";
import Input from "@/common/input";
import ChatBubble from "@/components/Chat/chat-bubble";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoIosAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";
import ChatSidebar from "@/components/Chat/chat-sidebar";

export default function Chat() {
   return (
      <>
         <div className="relative h-[calc(100svh-108px)] xl:h-[calc(100svh-128px)] chat-sidebar-scroll">
            <ChatSidebar />

            {currentChat === null ? (
               <div className="h-full px-4 py-3 bg-white shadow-card rounded-2xl sm:ml-[calc(348px+16px)] flex items-center justify-center">
                  <h1 className="text-2xl">Select A Conversation</h1>
               </div>
            ) : (
               <div className="h-full px-4 py-3 bg-white shadow-card rounded-2xl sm:ml-[calc(348px+16px)]">
                  <div className="flex items-center gap-1">
                     <FaChevronLeft
                        className="text-lg cursor-pointer text-primary sm:hidden"
                        onClick={() => setCurrentChat(null)}
                     />
                     <CardTitle>Muhammad Asim</CardTitle>
                  </div>
                  {/* Chat Scroll Area */}
                  <div className="h-[calc(100svh-232px)] xl:h-[calc(100svh-252px)] mt-2 space-y-3 overflow-y-auto">
                     <ChatBubble sender={"Muhammad Asim"} message={"Hi, are you there?"} time={"30 March 2020"} />
                     <ChatBubble
                        sender={"Ihtisham"}
                        message={"Hey, yes I'm here, how can I help you?"}
                        time={"30 March 2020"}
                     />
                  </div>
                  {/* Input Area */}
                  <div className="flex items-center gap-2 py-2 bg-white">
                     <label className="flex items-center justify-center p-1 text-2xl transition-all bg-gray-100 rounded-full cursor-pointer text-accent-dark hover:bg-gray-200 active:bg-gray-100 size-14 shrink-0">
                        <input type="file" className="hidden" />
                        <IoIosAttach />
                     </label>
                     <Input placeholder="Type a message" className="w-full text-base rounded-xl h-14 focus:ring-0" />

                     <Button variant="custom" className="font-normal rounded-full w-14 !h-14 !p-0 shrink-0">
                        <IoSend className="ml-0.5" />
                     </Button>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}
