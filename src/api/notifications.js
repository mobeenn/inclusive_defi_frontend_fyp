export async function getAllNotifications() {
   try {
      const res = await axiosPrivate.get("/notification/get-all-notifications");
      return res?.data?.data;
   } catch (error) {
      throw error;
   }
}
