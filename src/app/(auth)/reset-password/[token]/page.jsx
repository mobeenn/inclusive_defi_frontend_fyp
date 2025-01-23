import ResetPasswordForm from "@/components/Auth/reset-password-form";

export default function ResetPassword({ params }) {
   const { token } = params;
   const userId = token.split(".")[0];
   const otp = token.split(".")[1];
   return (
      <>
         <h1 className="text-3xl font-poppins text-white leading-[43px] tracking-wide font-semibold text-center uppercase">
            Reset Password
         </h1>
         <ResetPasswordForm userId={userId} otp={otp} />
      </>
   );
}
