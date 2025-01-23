"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Input from "@/common/input";
import { BiLogoZoom } from "react-icons/bi";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { newMeetingSchema } from "@/validation/chat";
import { createNewMeeting } from "@/api/chats";
import { useStore } from "@/store";
import { socket } from "@/lib/socket";
import { Select } from "@/common/select";

const initialValues = {
   topic: "",
   duration: "",
   startTime: "",
};

export default function NewMeetingModal() {
   const currentChat = useStore((state) => state.currentChat);
   const user = useStore((state) => state.user);
   const addUpcomingMessage = useStore((state) => state.addUpcomingMessage);

   const [open, setOpen] = useState(false);

   const closeModal = () => {
      setOpen(false);
   };

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
      validationSchema: newMeetingSchema,
      onSubmit,
   });

   async function onSubmit(values) {
      try {
         const data = {
            topic: values.topic,
            agenda: values.topic,
            duration: values.duration,
            start_time: values.startTime,
         };

         const res = await createNewMeeting(data);

         const meetingMessage = {
            chatId: currentChat?._id,
            message: res?.join_url,
            senderId: user?._id,
            isMeetingLink: true,
         };
         socket.emit("sendMessage", meetingMessage);

         meetingMessage._id = Date.now();
         meetingMessage.senderId = {
            _id: user?._id,
            name: user?.name,
            profileImg: user?.profileImg,
            email: user?.email,
         };

         addUpcomingMessage(meetingMessage);
         resetForm();
         closeModal();
         toast.success("Meeting created successfully");
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B5CFF] transition-all hover:bg-[#0B5CFF]/85 active:scale-95 active:bg-[#0B5CFF]">
               <BiLogoZoom className="h-6 w-6 text-white" />
            </button>
         </DialogTrigger>
         <DialogContent>
            <div className="mt-4">
               <h2 className="mb-8 text-center text-[1.75rem] font-semibold uppercase text-primary">
                  Start new meeting
               </h2>
               <form className="space-y-6" onSubmit={handleSubmit}>
                  <section>
                     <label
                        htmlFor="topic"
                        className="mb-1.5 inline-block text-sm font-medium"
                     >
                        Topic
                     </label>
                     <Input
                        id="topic"
                        name="topic"
                        value={values.topic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.topic && errors.topic}
                     />
                  </section>
                  <section>
                     <label
                        htmlFor="duration"
                        className="mb-1.5 inline-block text-sm font-medium"
                     >
                        Duration
                     </label>
                     <Select
                        name="duration"
                        value={values.duration}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.duration && errors.duration}
                     >
                        <option value="" disabled>
                           Select Duration
                        </option>
                        <option value="30">30 Minutes</option>
                        <option value="40">40 Minutes</option>
                        <option value="60">1H</option>
                        <option value="120">2H</option>
                     </Select>
                  </section>
                  <section>
                     <label
                        htmlFor="startTime"
                        className="mb-1.5 inline-block text-sm font-medium"
                     >
                        Start Time
                     </label>
                     <Input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={values.startTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.startTime && errors.startTime}
                        onClick={(e) => e.target.showPicker()}
                     />
                  </section>

                  <div className="flex justify-center">
                     <Button
                        variant="custom"
                        type="submit"
                        className="mt-8 font-normal"
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
