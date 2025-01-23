import { axiosPrivate, axiosPrivateForm } from "@/lib/axios";

export async function getAllChats({ pageParam = 1 }) {
   try {
      const res = await axiosPrivate.post("/chat/get-user-all-chats", {
         page_number: pageParam,
         limit: 14,
      });
      return res?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function getAllChatMessages(data) {
   try {
      const res = await axiosPrivate.post("/chat/get-chat-messages", data);
      return res?.data?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function sendFileInChat(data) {
   try {
      const res = await axiosPrivateForm.post("/chat/send-file-in-chat", data);
      return res?.data?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function searchChat(data) {
   try {
      if (data.searchQuery === "") return null;
      const res = await axiosPrivate.post("/chat/search-in-chats", data);
      return res?.data?.data;
   } catch (error) {
      throw error;
   }
}

export async function createNewMeeting(data) {
   try {
      const res = await axiosPrivate.post("/meeting/create-meeting", data);
      return res?.data?.data;
   } catch (error) {
      throw error;
   }
}
