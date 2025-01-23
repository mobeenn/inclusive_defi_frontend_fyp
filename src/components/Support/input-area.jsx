import { BsSendFill } from "react-icons/bs";
import Input from "@/common/input";
import { IoIosAttach } from "react-icons/io";
import { useFormik } from "formik";
import { useStore } from "@/store";
import { sendTicketMessage } from "@/api/tickets";
import { useEffect } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const initialValues = {
   message: "",
   attachment: null,
};

export default function InputArea() {
   const queryClient = useQueryClient();
   const currentTicket = useStore((state) => state.currentTicket);

   function handleFileChange(e) {
      if (e.target.files && e.target.files[0]) {
         setFieldValue("attachment", e.target.files[0]);
      }
   }

   const { values, setFieldValue, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
      initialValues,
      onSubmit,
   });

   async function onSubmit() {
      try {
         if (values?.message?.trim() || values.attachment) {
            const formData = new FormData();

            formData.append("message", values.message.trim());
            formData.append("attachments", values.attachment);
            formData.append("ticketId", currentTicket._id);

            const res = await sendTicketMessage(formData);
            await queryClient.setQueryData(["ticket-messages", currentTicket._id], (old) => [...old, res?.data?.data]);
            clearFormData(formData);
            resetForm();
         }
      } catch (error) {
         toast.error(error?.response?.data?.message);
      }
   }

   useEffect(() => {
      return () => {
         resetForm();
      };
   }, [currentTicket, resetForm]);

   // To Reset FormData
   function clearFormData(formData) {
      for (const key of formData.keys()) {
         formData.delete(key);
      }
   }

   return (
      <form className="relative flex items-center gap-2 py-2 bg-white" onSubmit={handleSubmit}>
         <label className="flex items-center justify-center p-1 text-2xl transition-all bg-gray-100 rounded-full cursor-pointer text-accent-dark hover:bg-gray-200 active:bg-gray-100 size-11 shrink-0">
            <input type="file" className="hidden" onChange={handleFileChange} onBlur={handleBlur} />
            <IoIosAttach />
         </label>
         <div className="relative w-full">
            <Input
               placeholder="Type a message"
               className="flex-1 w-full h-10 text-base rounded-full focus:ring-0"
               name="message"
               value={values.message}
               onChange={handleChange}
               onBlur={handleBlur}
            />

            <button
               className="font-normal text-lg flex items-center justify-center text-[#020C29] rounded-full size-8 absolute top-1/2 right-3 -translate-y-1/2"
               type="submit"
            >
               <BsSendFill />
            </button>
         </div>
         {values?.attachment && <AttachmentPreview name={values?.attachment?.name} setFieldValue={setFieldValue} />}
      </form>
   );
}

function AttachmentPreview({ name, setFieldValue }) {
   return (
      <div className="absolute left-0 flex items-center gap-2 px-4 text-gray-800 bg-gray-200 rounded-full -top-9 h-9">
         <FaRegFileAlt className="h-6" />
         <p className="text-sm">{name}</p>
         <IoCloseCircle className="text-xl cursor-pointer" onClick={() => setFieldValue("attachment", null)} />
      </div>
   );
}
