import ForgotPasswordForm from "@/components/Auth/forgot-password-form";

export default function ForgotPassword() {
   return (
      <>
         <h1 className="text-3xl font-poppins text-white leading-[43px] tracking-wide font-semibold text-center uppercase">
            Recover Password
         </h1>
         <div className="w-full max-w-[380px] pt-5">
            <h3 className="text-xs leading-[21px] tracking-tight font-poppins text-white font-normal text-left mb-3">
               Enter your email to set a new password
            </h3>
            <ForgotPasswordForm />
         </div>
      </>
   );
}
