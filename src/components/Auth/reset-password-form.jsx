"use client";
import AuthInput from "@/common/auth-input";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import { toast } from "sonner";
import { resetPasswordSchema } from "@/validation/auth";
import Label from "@/common/label";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/api/auth";

const initialValues = {
   password: "",
   confirmPassword: "",
};

export default function ResetPasswordForm({ userId, otp }) {
   const router = useRouter();
   const {
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
      resetForm,
   } = useFormik({
      initialValues,
      validationSchema: resetPasswordSchema,
      onSubmit,
   });
   async function onSubmit(values) {
      try {
         values.userId = userId;
         values.emailOtp = otp;
         const res = await resetPassword(values);

         toast.success(res.data.message);
         router.push("/signin");
      } catch (error) {
         toast.error(error.response.data.message);
      }
   }

   return (
      <form
         className="mt-3 w-full max-w-[380px] space-y-6"
         onSubmit={handleSubmit}
      >
         <section>
            <Label htmlFor="password" variant="auth">
               Password
            </Label>
            <AuthInput
               id="password"
               type="password"
               placeholder="Enter a strong password..."
               name="password"
               value={values.password}
               onChange={handleChange}
               onBlur={handleBlur}
               error={touched.password && errors.password}
            />
         </section>
         <section>
            <Label htmlFor="confirmPassword" variant="auth">
               Re-enter Password
            </Label>
            <AuthInput
               id="confirmPassword"
               type="password"
               placeholder="Re-enter a strong password..."
               name="confirmPassword"
               value={values.confirmPassword}
               onChange={handleChange}
               onBlur={handleBlur}
               error={touched.confirmPassword && errors.confirmPassword}
            />
         </section>
         <div className="flex justify-center pt-2">
            <Button variant="auth" type="submit" loading={isSubmitting}>
               Update
            </Button>
         </div>
      </form>
   );
}
