"use client";
import AuthInput from "@/common/auth-input";
import Link from "next/link";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signinSchema } from "@/validation/auth";
import Label from "@/common/label";
import { login } from "@/api/auth";
import { useStore } from "@/store";

const initialValues = {
   email: "",
   password: "",
};

export default function SignInForm() {
   const router = useRouter();
   const fetchCurrentUser = useStore((state) => state.fetchCurrentUser);

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
      validationSchema: signinSchema,
      onSubmit,
   });

   async function onSubmit(values) {
      try {
         const res = await login(values);

         localStorage.setItem("token", res?.data?.token);
         localStorage.setItem("user", JSON.stringify(res?.data?.data));

         toast.success(res.data.message);
         fetchCurrentUser();
         router.push("/dashboard");
      } catch (error) {
         if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
         } else {
            toast.error("Something went wrong");
         }
      }
   }

   return (
      <form className="w-full max-w-[486px]" onSubmit={handleSubmit}>
         <div className="mt-4 space-y-6">
            <section>
               <Label htmlFor="email" variant="auth">
                  Email
               </Label>
               <AuthInput
                  id="email"
                  type="email"
                  placeholder="Enter your email..."
                  name="email"
                  value={values.email}
                  error={touched.email && errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
               />
            </section>
            <section>
               <Label htmlFor="password" variant="auth">
                  Password
               </Label>
               <AuthInput
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={values.password}
                  error={touched.password && errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
               />
            </section>
         </div>

         <div className="mt-3 flex justify-end">
            <p className="text-right font-poppins text-[10px] font-normal text-white">
               Forgot password?{" "}
               <Link
                  href="/forgot-password"
                  className="text-[#0096FF] underline"
               >
                  Recover Now
               </Link>
            </p>
         </div>

         <div className="my-[50px] flex justify-center">
            <Button variant="auth" type="submit" loading={isSubmitting}>
               Sign In
            </Button>
         </div>

         <span className="flex flex-wrap justify-center gap-1 font-poppins text-xs font-medium uppercase text-white">
            Don’t have account?{" "}
            <Link href="/signup" className="text-[#0096FF] underline">
               Get register
            </Link>
         </span>
      </form>
   );
}
