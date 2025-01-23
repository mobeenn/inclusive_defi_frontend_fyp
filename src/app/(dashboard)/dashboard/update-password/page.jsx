import UpdatePasswordForm from "@/components/Auth/update-password-form";

export default function UpdateProfile() {
   return (
      <>
         <div className="max-w-[624px] px-4 py-6 sm:p-[1.75rem] bg-white shadow-card rounded-lg sm:rounded-2xl">
            <UpdatePasswordForm />
         </div>
      </>
   );
}
