import { axiosPrivate } from "@/lib/axios";

export async function getStakingHistory({ perPage, page, address }) {
   try {
      const res = await axiosPrivate.post(
         `/staking/get-staking-history?page_number=${page}&limit=${perPage}`,
         { wallet_address: address },
      );
      return res?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function createStakingHistory(data) {
   try {
      const res = await axiosPrivate.post(
         "/staking/create-staking-history",
         data,
      );
      return res;
   } catch (error) {
      throw error;
   }
}

export async function updateStakeHistory(data) {
   try {
      const res = await axiosPrivate.post(
         "/staking/update-staking-history",
         data,
      );
      return res;
   } catch (error) {
      throw error;
   }
}
