"use client";
import AuthInput from "@/common/auth-input";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import { toast } from "sonner";
import { forgotPasswordSchema } from "@/validation/auth";
import { forgotPassword } from "@/api/auth";

const initialValues = {
   email: "",
};

export default function ForgotPasswordForm() {
   const {
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
   } = useFormik({
      initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit,
   });
   async function onSubmit(values) {
      try {
         const res = await forgotPassword(values);
         toast.success(res.data.message);
      } catch (error) {
         toast.error(error.response.data.message);
      }
   }
   return (
      <form className="space-y-12" onSubmit={handleSubmit}>
         <AuthInput
            type="email"
            placeholder="Enter your email"
            name="email"
            value={values.email}
            error={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
         />

         <div className="flex justify-center">
            <Button variant="auth" type="submit" loading={isSubmitting}>
               SEND
            </Button>
         </div>
      </form>
   );
}
