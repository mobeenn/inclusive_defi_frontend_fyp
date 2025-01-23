"use client";
import AuthInput from "@/common/auth-input";
import Link from "next/link";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/validation/auth";
import Label from "@/common/label";
import PasswordTolltip from "../Tooltips/password-tooltip";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa";
import { register } from "@/api/auth";

const initialValues = {
   email: "",
   password: "",
   role: "creator",
   terms: false,
};

export default function SignUpForm() {
   const router = useRouter();
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
      validationSchema: signupSchema,
      onSubmit,
   });

   async function onSubmit(values) {
      try {
         const { terms, ...data } = values;
         const res = await register(data);

         toast.success(res.data.message, { duration: 8000 });
         router.push("/signin");
      } catch (error) {
         toast.error(error.response.data.message);
      }
   }

   return (
      <form className="w-full max-w-[486px]" onSubmit={handleSubmit}>
         <div className="mt-5 space-y-6">
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
               <Label
                  htmlFor="password"
                  variant="auth"
                  className="flex items-center gap-1.5"
               >
                  Password
                  <PasswordTolltip variant="auth" />
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

            <section className="flex items-center justify-center gap-6">
               <RoleItem
                  role="creator"
                  values={values}
                  onChange={handleChange}
               />
               <RoleItem
                  role="investor"
                  values={values}
                  onChange={handleChange}
               />
            </section>
         </div>

         {/* Terms & Conditions */}
         <section className="relative mt-6">
            <div className="flex items-center justify-start gap-2">
               <input
                  id="agree"
                  type="checkbox"
                  name="terms"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="size-4 cursor-pointer"
               />
               <label
                  htmlFor="agree"
                  className="font-poppins text-xs font-medium uppercase text-white"
               >
                  I agree to{" "}
                  <a
                     href="http://100.25.20.178:3002/terms-of-use"
                     className="text-[#053CFF]"
                     target="_blank"
                  >
                     terms and conditions
                  </a>
               </label>
            </div>
         </section>
         {errors["terms"] && touched["terms"] && (
            <p className="absolute mt-1 text-sm text-red-500">{errors.terms}</p>
         )}

         <div className="mt-8 flex flex-col items-center">
            <Button variant="auth" type="submit" loading={isSubmitting}>
               Sign Up
            </Button>
            <span className="my-8 font-poppins text-xs font-medium uppercase text-white">
               Already have account?{" "}
               <Link href="/signin" className="text-[#0096FF] underline">
                  Sign In
               </Link>
            </span>
         </div>
      </form>
   );
}

function RoleItem({ role, values, ...props }) {
   return (
      <label className="relative flex h-[88px] w-[98px] cursor-pointer flex-col items-center justify-center gap-3 rounded bg-white">
         <input
            type="radio"
            name="role"
            value={role}
            {...props}
            className="hidden"
         />
         <Image
            src={`/assets/icons/${role}.svg`}
            alt={role}
            width={30}
            height={30}
         />
         <h2 className="text-[13px] font-medium uppercase text-[#000033]">
            {role}
         </h2>

         <div
            className={cn(
               "absolute left-2 top-2 flex size-[14px] scale-0 items-center justify-center rounded-full bg-[#000033] transition-all",
               role === values.role && "scale-100",
            )}
         >
            <FaCheck className="text-[8px] text-white" />
         </div>
      </label>
   );
}
