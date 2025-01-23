import { HiDotsVertical } from "react-icons/hi";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogCancelPrimitive,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store";
import { closeTicket } from "@/api/tickets";
import { toast } from "sonner";
import { IoCloseCircle } from "react-icons/io5";

export default function CloseTicket() {
   const [isAlertOpen, setIsAlertOpen] = useState(false);

   const openAlert = () => {
      setIsAlertOpen(true);
   };

   return (
      <>
         <Menubar>
            <MenubarMenu>
               <MenubarTrigger asChild>
                  <button className="text-3xl cursor-pointer">
                     <HiDotsVertical />
                  </button>
               </MenubarTrigger>
               <MenubarContent className="min-w-[160px] mr-3 sm:mr-6">
                  <MenubarItem
                     className="flex items-center gap-1 text-base font-medium text-red-600 cursor-pointer hover:!bg-red-50 hover:!text-red-600 transition-all"
                     onClick={openAlert}
                  >
                     <IoCloseCircle className="w-5 h-5 text-red-500" /> Close Ticket
                  </MenubarItem>
               </MenubarContent>
            </MenubarMenu>
         </Menubar>
         <CloseTicketAlert open={isAlertOpen} setOpen={setIsAlertOpen} />
      </>
   );
}

function CloseTicketAlert({ open, setOpen }) {
   const queryClient = useQueryClient();
   const currentTicket = useStore((state) => state.currentTicket);
   const setCurrentTicket = useStore((state) => state.setCurrentTicket);

   const { mutate, isPending } = useMutation({
      mutationFn: closeTicket,
      onSuccess: async (res) => {
         toast.success(res?.data?.message);
         await queryClient.setQueryData(["tickets", "all"], (old) =>
            old?.map((ticket) => (ticket._id === currentTicket._id ? { ...ticket, ticketStatus: "closed" } : ticket))
         );
         await queryClient.setQueryData(["tickets", "open"], (old) =>
            old?.filter((ticket) => ticket._id !== currentTicket._id)
         );
         await queryClient.setQueryData(["tickets", "closed"], (old) => [...old, res?.data?.data]);
      },
      onError: (error) => {
         if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
         }
      },
      onSettled: () => {
         setCurrentTicket(null);
         setOpen(false);
      },
   });

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent className="pb-[64px]">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-[#B0AECC] text-[11.px] font-medium font-poppins uppercase tracking-tight ">
                  Close Ticket
               </h2>
               <AlertDialogCancelPrimitive>
                  <Image src="/assets/icons/alert-cross.svg" alt="close" height={24} width={24} />
               </AlertDialogCancelPrimitive>
            </div>
            <p className="font-medium text-center text-white uppercase font-poppins">
               Are you sure you want to close this ticket?
            </p>
            <AlertDialogFooter>
               <AlertDialogAction
                  className="bg-[#FA1C1C]"
                  onClick={() => mutate({ ticketId: currentTicket?._id })}
                  isLoading={isPending}
               >
                  Yes
               </AlertDialogAction>
               <AlertDialogCancel>No</AlertDialogCancel>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
