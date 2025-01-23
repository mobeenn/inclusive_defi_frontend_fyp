import { BsSendFill } from "react-icons/bs";
import Input from "@/common/input";
import { IoIosAttach } from "react-icons/io";
import { useFormik } from "formik";
import { useStore } from "@/store";
import { useEffect } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { socket } from "@/lib/socket";
import { sendFileInChat } from "@/api/chats";

const initialValues = {
   message: "",
   attachment: null,
};

export default function InputArea() {
   const currentChat = useStore((state) => state.currentChat);
   const user = useStore((state) => state.user);
   const addUpcomingMessage = useStore((state) => state.addUpcomingMessage);

   function handleFileChange(e) {
      if (e.target.files && e.target.files[0]) {
         setFieldValue("attachment", e.target.files[0]);
      }
   }

   const {
      values,
      setFieldValue,
      handleBlur,
      handleChange,
      handleSubmit,
      resetForm,
   } = useFormik({
      initialValues,
      onSubmit,
   });

   async function onSubmit() {
      try {
         if (values?.message?.trim() && values?.attachment === null) {
            const data = {
               chatId: currentChat?._id,
               message: values?.message.trim(),
               senderId: user?._id,
            };
            socket.emit("sendMessage", data);

            data._id = Date.now();
            data.senderId = {
               _id: user?._id,
               name: user?.name,
               profileImg: user?.profileImg,
               email: user?.email,
            };

            addUpcomingMessage(data);
            resetForm();
         } else if (values?.attachment) {
            const formData = new FormData();

            if (values?.message?.trim()) {
               formData.append("message", values.message.trim());
            }

            formData.append("attachments", values.attachment);
            formData.append("chatId", currentChat._id);
            formData.append("senderId", user._id);

            const res = await sendFileInChat(formData);

            addUpcomingMessage(res);
            resetForm();
         }
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      return () => {
         resetForm();
      };
   }, [currentChat, resetForm]);

   // To Reset FormData
   function clearFormData(formData) {
      for (const key of formData.keys()) {
         formData.delete(key);
      }
   }

   return (
      <form
         className="relative flex items-center gap-2 bg-white py-2"
         onSubmit={handleSubmit}
      >
         <label className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 p-1 text-2xl text-accent-dark transition-all hover:bg-gray-200 active:bg-gray-100">
            <input
               type="file"
               className="hidden"
               onChange={handleFileChange}
               onBlur={handleBlur}
            />
            <IoIosAttach />
         </label>
         <div className="relative w-full">
            <Input
               placeholder="Type a message"
               className="h-10 w-full flex-1 rounded-full text-base focus:ring-0"
               name="message"
               value={values.message}
               onChange={handleChange}
               onBlur={handleBlur}
            />

            <button
               className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-lg font-normal text-[#020C29]"
               type="submit"
            >
               <BsSendFill />
            </button>
         </div>
         {values?.attachment && (
            <AttachmentPreview
               name={values?.attachment?.name}
               setFieldValue={setFieldValue}
            />
         )}
      </form>
   );
}

function AttachmentPreview({ name, setFieldValue }) {
   return (
      <div className="absolute -top-9 left-0 flex h-9 items-center gap-2 rounded-full bg-gray-200 px-4 text-gray-800">
         <FaRegFileAlt className="h-6" />
         <p className="text-sm">{name}</p>
         <IoCloseCircle
            className="cursor-pointer text-xl"
            onClick={() => setFieldValue("attachment", null)}
         />
      </div>
   );
}
