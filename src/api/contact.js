import { axiosAuth } from "@/lib/axios";

export async function postContact(data) {
   try {
      const res = await axiosAuth.post("/contactus/contact-us", data);
      return res;
   } catch (error) {
      throw error;
   }
}
