"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Input from "@/common/input";
import Textarea from "@/common/textarea";
import { useState } from "react";
import { useFormik } from "formik";
import { createTicket } from "@/api/tickets";
import { toast } from "sonner";
import { newTicketSchema } from "@/validation/support";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store";

const initialValues = {
   subject: "",
   message: "",
   attachment: null,
};

export default function NewTicketModal() {
   const queryClient = useQueryClient();
   const setCurrentTicket = useStore((state) => state.setCurrentTicket);

   const [open, setOpen] = useState(false);

   const closeModal = () => {
      setOpen(false);
   };

   const { mutate } = useMutation({
      mutationFn: createTicket,
      onSuccess: async (res) => {
         // await queryClient.setQueryData(["tickets", "all"], (old) => [...old, res?.data?.data]);
         // await queryClient.setQueryData(["tickets", "open"], (old) => [...old, res?.data?.data]);
         await queryClient.refetchQueries({ queryKey: ["tickets"] });
         toast.success(res?.data?.message);
         resetForm();
         closeModal();
         setCurrentTicket(res?.data?.data);
      },
      onError: (error) => {
         console.log(error);
         if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
         }
      },
   });

   const {
      values,
      errors,
      touched,
      setFieldValue,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
      resetForm,
   } = useFormik({
      initialValues,
      validationSchema: newTicketSchema,
      onSubmit: (values) => {
         const formData = new FormData();
         formData.append("subject", values.subject);
         formData.append("message", values.message);
         if (values.attachment) {
            formData.append("attachments", values.attachment);
         }
         mutate(formData);
      },
   });

   const handleImgChange = (e, name) => {
      if (e.target.files && e.target.files[0]) {
         setFieldValue(name, e.currentTarget.files[0]);
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button
               variant="auth"
               className="!h-8 !px-4 font-poppins text-sm normal-case"
            >
               Create Ticket
            </Button>
         </DialogTrigger>
         <DialogContent>
            <div className="mt-4">
               <h2 className="mb-10 text-center text-[1.75rem] font-semibold uppercase text-primary">
                  Start new ticket
               </h2>
               <form className="space-y-8" onSubmit={handleSubmit}>
                  <section>
                     <Input
                        placeholder="Subject"
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.subject && errors.subject}
                     />
                  </section>
                  <section>
                     <Textarea
                        placeholder="Write your message here..."
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.message && errors.message}
                     />
                  </section>
                  <section>
                     <Input
                        type="file"
                        id="attachment"
                        className="cursor-pointer py-2.5 font-[300] text-[#A0AEC0] file:hidden"
                        name="attachment"
                        onChange={(e) => {
                           handleImgChange(e, "attachment");
                        }}
                        onBlur={handleBlur}
                     />
                  </section>

                  <div className="flex justify-center">
                     <Button
                        variant="custom"
                        type="submit"
                        className="mt-12 font-normal"
                        loading={isSubmitting}
                     >
                        Send
                     </Button>
                  </div>
               </form>
            </div>
         </DialogContent>
      </Dialog>
   );
}
