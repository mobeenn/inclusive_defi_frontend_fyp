import { axiosAuth, axiosPrivate, axiosPrivateForm } from "@/lib/axios";

export async function login(data) {
   try {
      const res = await axiosAuth.post("/login", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function register(data) {
   try {
      const res = await axiosAuth.post("/register", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function getCurrentUser() {
   try {
      const res = await axiosPrivate.get("/find-user-profile");
      return res?.data?.data;
   } catch (error) {
      throw error;
   }
}

export async function forgotPassword(data) {
   try {
      const res = await axiosPrivate.post("/forget-password", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function resetPassword(data) {
   try {
      const res = await axiosAuth.post("/reset-password", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function verifyEmail(data) {
   try {
      const res = await axiosAuth.post("/verify-user-email", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function resendEmailVerification() {
   try {
      const res = await axiosPrivate.get("/send-email-verify-link");
      return res;
   } catch (error) {
      throw error;
   }
}

export async function updatePassword(data) {
   try {
      const res = await axiosPrivate.post("/update-password", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function updateProfile(data) {
   try {
      const res = await axiosPrivateForm.post("/update-profile", data);
      return res;
   } catch (error) {
      throw error;
   }
}
