import { axiosPrivate } from "@/lib/axios";

export async function getTransactionsHistory({ page, perPage, type }) {
   try {
      const res = await axiosPrivate.post(
         `/transaction/get-transactions-history?page_number=${page}&limit=${perPage}`,
         { transaction_type: type },
      );
      return res?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function addTransaction(data) {
   try {
      const res = await axiosPrivate.post(
         "/transaction/create-transaction-history",
         data,
      );
      return res;
   } catch (error) {
      throw error;
   }
}
