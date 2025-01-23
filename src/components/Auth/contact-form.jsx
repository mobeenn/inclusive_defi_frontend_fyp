"use client";
import { useFormik } from "formik";
import { contactSchema } from "@/validation/contact";
import { postContact } from "@/api/contact";
import { toast } from "sonner";

const initialValues = {
   email: "",
   subject: "",
   message: "",
};

export default function ContactForm() {
   const {
      values,
      errors,
      touched,
      handleSubmit,
      handleBlur,
      handleChange,
      resetForm,
   } = useFormik({
      initialValues,
      validationSchema: contactSchema,
      onSubmit,
   });

   async function onSubmit(data) {
      try {
         const res = await postContact(data);
         toast.success(res?.data?.message);
         resetForm();
      } catch (error) {
         toast.error("Error sending message");
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <div className="space-y-6 pt-5">
            <Input
               type="email"
               placeholder="Your email"
               name="email"
               value={values.email}
               error={touched.email && errors.email}
               onChange={handleChange}
               onBlur={handleBlur}
            />
            <Input
               placeholder="Subject"
               name="subject"
               value={values.subject}
               error={touched.subject && errors.subject}
               onChange={handleChange}
               onBlur={handleBlur}
            />
            <Textarea
               placeholder="Write a message for us"
               name="message"
               value={values.message}
               error={touched.message && errors.message}
               onChange={handleChange}
               onBlur={handleBlur}
            />
         </div>
         <div className="flex justify-center lg:justify-start">
            <button
               className="primary-button mt-8 rounded px-[50px] py-[5px] font-poppins text-[16px] font-medium uppercase sm:text-[20px]"
               type="submit"
            >
               Send
            </button>
         </div>
      </form>
   );
}

function Input({ type = "text", ...props }) {
   return (
      <div className="relative">
         <input
            className="w-full max-w-[400px] rounded-md border border-[black]/10 px-[20px] py-[10px] outline-none"
            type="text"
            placeholder={props.placeholder}
            {...props}
         />
         {props.error && (
            <div className="absolute text-xs font-medium text-red-500">
               {props.error}
            </div>
         )}
      </div>
   );
}

function Textarea({ ...props }) {
   return (
      <div className="relative">
         <textarea
            className="w-full max-w-[400px] resize-none rounded-md border border-[black]/10 px-5 py-3 outline-none"
            placeholder={props.placeholder}
            rows={4}
            {...props}
         ></textarea>
         {props.error && (
            <div className="absolute text-xs font-medium text-red-500">
               {props.error}
            </div>
         )}
      </div>
   );
}
