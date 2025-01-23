"use client";

import { socket } from "@/lib/socket";
import { useStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ChatSocketProvider({ children }) {
   const addUpcomingMessage = useStore((state) => state.addUpcomingMessage);
   const addNewMessage = useStore((state) => state.addNewMessage);
   const setNewMessages = useStore((state) => state.setNewMessages);
   const setOnlineUsers = useStore((state) => state.setOnlineUsers);
   const user = useStore((state) => state.user);
   const currentChat = useStore((state) => state.currentChat);
   const setCurrentChat = useStore((state) => state.setCurrentChat);
   const queryClient = useQueryClient();

   useEffect(() => {
      socket.connect();
      socket.emit("connection");
      socket.emit("connected", { userId: user?._id });
      // socket.on("online-notification", (data) => {
      //    console.log("online-notification", data);
      // });
      socket.on("get_chat_id", ({ chatId, usersDetails }) => {
         const newChat = {
            _id: chatId,
            senderId: usersDetails?.senderId?._id,
            receiverId: usersDetails?.receiverId?._id,
            senderDetails: usersDetails?.senderId,
            receiverDetails: usersDetails?.receiverId,
            createdAt: usersDetails?.createdAt,
         };
         // await queryClient.invalidateQueries(["chats"], (old) => [...old, newChat]);
         queryClient.invalidateQueries({ queryKey: ["chats"] });
         queryClient.refetchQueries({ queryKey: ["chats"] });

         if (usersDetails?.senderId?._id === user?._id) {
            console.log("get_chat_id", newChat);
            setCurrentChat(newChat);
         }
      });

      socket.on("message", (message) => {
         addNewMessage(message);
         if (message.chatId === currentChat?._id) {
            addUpcomingMessage(message);
         }
         if (window.location.pathname !== "/dashboard/chat") {
            toast.info(`New message from ${message.senderId?.name}`);
         }
         console.log("message", message);
      });

      socket.on("get-all-unread-messages", (data) => {
         setNewMessages(data);
      });

      socket.on("get-online-users", (data) => {
         // console.log("get-online-users", data);
         setOnlineUsers(data);
      });

      return () => {
         socket.disconnect();
         socket.off("online-notification");
         socket.off("get_chat_id");
         socket.off("message");
         socket.off("get_chat_id");
         socket.off("get-all-unread-messages");
         socket.off("get-online-users");
      };
   }, [
      user?._id,
      queryClient,
      addNewMessage,
      setCurrentChat,
      setNewMessages,
      setOnlineUsers,
      addUpcomingMessage,
      currentChat,
   ]);
   return <>{children}</>;
}
