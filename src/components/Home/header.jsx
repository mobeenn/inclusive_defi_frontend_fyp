import { resendEmailVerification } from "@/api/auth";
import Title from "@/common/title";
import { useStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWrench } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { toast } from "sonner";

export default function Header() {
   const user = useStore((state) => state.user);
   const fetchCurrentUser = useStore((state) => state.fetchCurrentUser);

   const [isSendingEmail, setIsSendingEmail] = useState(false);

   const isKycApproved = user?.kycStatus === "approved";
   const isKycUnderPending = user?.kycStatus === "pending";
   const isKycUnderReview = user?.kycStatus === "under-review";
   const isKycRejected = user?.kycStatus === "rejected";

   const isEmailVerified = user?.verification?.verifiedEmail;
   const isUserActive = user?.isActive === "active";

   const profileSrc =
      user?.profileImg && user?.profileImg !== "null"
         ? user?.profileImg
         : "/assets/images/default-avatar.png";

   useEffect(() => {
      fetchCurrentUser();
   }, [fetchCurrentUser]);

   async function handleResendEmail() {
      if (isSendingEmail) return;

      try {
         setIsSendingEmail(true);
         const res = await resendEmailVerification();
         console.log(res);
         toast.success(res?.data?.message);
         setIsSendingEmail(false);
      } catch (error) {
         console.log(error);
         toast.error(error?.response?.data?.message);
         setIsSendingEmail(false);
      }
   }

   return (
      <div className="mt-1.5 flex flex-col justify-center gap-3 rounded-2xl bg-accent bg-waves bg-cover bg-no-repeat px-3 py-4 sm:h-[15.625rem] sm:justify-between sm:gap-0 sm:px-6 sm:pt-10">
         {user && isKycApproved && isUserActive && (
            <Title className="text-base text-white">Welcome Back!</Title>
         )}

         {user && isKycUnderPending && (
            <Title className="text-base font-normal text-white">
               Welcome to Inclusive Defi! Complete your KYC to enjoy all the
               perks of this platform.{" "}
               <Link
                  href="/dashboard/update-profile"
                  className="font-semibold text-[#F2994A]"
               >
                  Complete KYC
               </Link>
            </Title>
         )}

         {user && isKycUnderReview && (
            <Title className="text-base font-normal text-white">
               <span className="flex items-center gap-1">
                  <GiCheckMark />
                  KYC completed.
               </span>
               <span className="block font-semibold text-[#F2994A]">
                  Your profile is under review, soon it’ll be approved.
               </span>
            </Title>
         )}

         {user && isKycRejected && (
            <Title className="text-base font-normal text-white">
               Your KYC has been rejected. Please contact us for more
               information.
            </Title>
         )}

         {user && isEmailVerified === false && (
            <Title className="text-base font-normal text-white">
               Check your email to verify or{" "}
               <button
                  className="cursor-pointer font-semibold text-[#F2994A]"
                  onClick={handleResendEmail}
               >
                  {isSendingEmail ? "Resending..." : "Resend email"}
               </button>
            </Title>
         )}

         {user && isUserActive === false && (
            <Title className="text-base font-normal text-white">
               Your account has been blocked or deactivated. Please contact us
               for more information.
            </Title>
         )}

         <div className="relative transform rounded-xl bg-white p-3 shadow-card-sm sm:translate-y-1/2 sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between">
               {/* User Info */}
               <div className="flex items-center gap-[.75rem] sm:gap-[1.375rem]">
                  <Image
                     src={profileSrc}
                     alt="user"
                     width={160}
                     height={160}
                     className="aspect-square size-[4.375rem] rounded-lg object-cover sm:size-[5rem] sm:rounded-xl"
                  />

                  <div>
                     <h2 className="text-base font-[600] text-primary sm:text-lg">
                        {user?.name}
                     </h2>
                     <p className="w-full truncate text-sm font-[300] text-[#718096]">
                        {user?.email}
                     </p>
                  </div>
               </div>
               {/* Update Profile */}
               <Link
                  href="/dashboard/update-profile"
                  className="absolute right-2 top-3 flex items-center gap-1.5 px-1 font-[600] uppercase text-primary sm:static"
               >
                  <FaWrench className="text-sm" />
                  <p className="hidden text-[13px] tracking-[0.5px] sm:block">
                     Update Profile
                  </p>
               </Link>
            </div>
         </div>
      </div>
   );
}
