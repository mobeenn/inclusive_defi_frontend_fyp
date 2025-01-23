import { axiosPrivate, axiosPrivateForm } from "@/lib/axios";

export async function getAllTickets() {
   try {
      const res = await axiosPrivate.get("/ticket/get-all-user-tickets");
      return res?.data?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function filterTickets(data) {
   try {
      const res = await axiosPrivate.post("/ticket/search-ticket", data);
      return res?.data?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function createTicket(data) {
   try {
      const res = await axiosPrivateForm.post("/ticket/create-a-ticket", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function getAllTicketMessages(data) {
   try {
      const res = await axiosPrivate.post("/ticketreply/get-user-messages", data);
      return res?.data?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function sendTicketMessage(data) {
   try {
      const res = await axiosPrivateForm.post("/ticketreply/send-ticket-reply", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function closeTicket(data) {
   try {
      const res = await axiosPrivate.post("/ticket/close-ticket", data);
      return res;
   } catch (error) {
      throw error;
   }
}
