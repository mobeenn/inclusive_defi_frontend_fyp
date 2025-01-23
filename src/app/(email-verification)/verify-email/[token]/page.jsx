"use client";

import { verifyEmail } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function VerifyEmail({ params }) {
   const router = useRouter();
   const [isEmailVerified, setIsEmailVerified] = useState(false);

   const { token } = params;
   const userId = token.split(".")[0];
   const emailOtp = token.split(".")[1];

   useEffect(() => {
      async function initiateVerifyEmail() {
         try {
            const res = await verifyEmail({
               userId,
               emailOtp,
            });
            console.log(res);
            setIsEmailVerified(true);
         } catch (error) {
            console.log(error);
         }
      }

      initiateVerifyEmail();
   }, [emailOtp, userId]);

   useEffect(() => {
      if (!isEmailVerified) return;

      router.push("/dashboard");
   }, [isEmailVerified, router]);

   return (
      <div className="flex min-h-svh items-center justify-center">
         {isEmailVerified ? (
            <h1 className="text-center text-3xl font-bold">
               Your email has been verified! Redirecting to home page...
            </h1>
         ) : (
            <h1 className="text-center text-3xl font-bold">
               Verifying your email...
            </h1>
         )}
      </div>
   );
}
