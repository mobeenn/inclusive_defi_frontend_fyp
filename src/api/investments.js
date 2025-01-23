import { axiosPrivate } from "@/lib/axios";

export async function getAllInvestments({ perPage, page }) {
   try {
      const res = await axiosPrivate.get(
         `/investor/get-projects-investor-invested-in?page_number=${page}&limit=${perPage}`,
      );
      return res.data;
   } catch (error) {
      console.log(error);
   }
}

export async function investInProject(data) {
   try {
      const res = await axiosPrivate.post("/investor/create-investment", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function getInvestmentsSummary() {
   try {
      const res = await axiosPrivate.get("/investor/get-my-investment");
      return res?.data;
   } catch (error) {
      console.log(error);
   }
}
