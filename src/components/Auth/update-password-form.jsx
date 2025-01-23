"use client";
import Input from "@/common/input";
import Label from "@/common/label";
import PasswordTolltip from "../Tooltips/password-tooltip";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import { changePasswordSchema } from "@/validation/auth";
import { logout } from "@/lib/auth";
import { toast } from "sonner";
import { updatePassword } from "@/api/auth";

const initialValues = {
   oldPassword: "",
   password: "",
   confirmPassword: "",
};

export default function UpdatePasswordForm() {
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
      validationSchema: changePasswordSchema,
      onSubmit,
   });

   async function onSubmit(values) {
      try {
         const res = await updatePassword(values);
         toast.success(res.data.message);
         logout();
      } catch (error) {
         toast.error(error.response.data.message);
      }
   }

   return (
      // Original is space-y-6
      <form className="space-y-8" onSubmit={handleSubmit}>
         <section>
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
               id="oldPassword"
               type="password"
               placeholder="Enter your old password"
               name="oldPassword"
               value={values.oldPassword}
               onChange={handleChange}
               onBlur={handleBlur}
               error={touched.oldPassword && errors.oldPassword}
            />
         </section>
         <section>
            <Label htmlFor="password" className="flex items-center gap-2">
               New Password
               <PasswordTolltip />
            </Label>
            <Input
               id="password"
               type="password"
               placeholder="Enter your new password"
               name="password"
               value={values.password}
               onChange={handleChange}
               onBlur={handleBlur}
               error={touched.password && errors.password}
            />
         </section>
         <section>
            <Label htmlFor="cPassword">Re-enter Password</Label>
            <Input
               id="cPassword"
               type="password"
               placeholder="Re-enter your new password"
               name="confirmPassword"
               value={values.confirmPassword}
               onChange={handleChange}
               onBlur={handleBlur}
               error={touched.confirmPassword && errors.confirmPassword}
            />
         </section>

         <section>
            <Button
               type="submit"
               variant="custom"
               className="mt-3 font-[400]"
               loading={isSubmitting}
            >
               update
            </Button>
         </section>
      </form>
   );
}
