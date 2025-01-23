import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaRegEdit } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogCancelPrimitive,
   AlertDialogContent,
   AlertDialogFooter,
} from "../ui/alert-dialog";
import { useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/api/projects";
import { toast } from "sonner";
import ProjectTolltip from "../Tooltips/project-tooltip";

export default function Card({ project, showControls = true }) {
   const router = useRouter();
   const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

   function handleDeleteClick(event) {
      event.stopPropagation();
      event.preventDefault();
      setIsDeleteAlertOpen(true);
   }

   function handleEditClick(event) {
      event.stopPropagation();
      event.preventDefault();

      router.push(
         `/dashboard/edit-project/${project._id}?name=${encodeURIComponent(project.projectTitle)}`,
      );
   }

   const remainingFunds = project.fundNeeded - project.totalInvestment;
   const completedPercent = Math.round(
      (project.totalInvestment / project.fundNeeded) * 100,
   );

   return (
      <>
         <Link
            href={`/dashboard/projects/${project?._id}?name=${encodeURIComponent(project.projectTitle)}`}
            className="group"
         >
            <div className="relative w-auto rounded-[1px] bg-white shadow-[0px_4px_4px_0px_#C6C1C140] @container">
               <div className="square absolute right-3 top-1 z-10 flex size-14 items-center justify-center rounded-full border border-black bg-white p-3 shadow-[4px_4px_7px_0px_#FFFFFF4A] @[350px]:right-5 @[350px]:size-[4.625rem]">
                  <Image
                     src="/assets/icons/bnb-logo.png"
                     alt="token icon"
                     height={52}
                     width={52}
                     className="w-[38px] @[350px]:w-[48px]"
                  />
               </div>
               <div className="overflow-hidden">
                  <Image
                     src={project?.projectImage}
                     className="h-[210px] w-full object-cover transition-all duration-300 group-hover:scale-[1.06]"
                     alt="project"
                     width={650}
                     height={650}
                  />
               </div>
               {/* Body */}
               <div className="flex flex-col gap-[20px] border border-[#E0DEDE] px-3 py-[12px] pb-[32px] sm:px-[20px]">
                  <div className="flex items-center justify-between">
                     <p className="line-clamp-1 font-roboto text-[22px] font-[700] capitalize text-black">
                        {project?.projectTitle}
                     </p>
                     <div className="flex gap-[10px]">
                        <div className="flex w-[23px] items-center justify-center rounded-full bg-primary p-1 text-white">
                           <FaFacebookF />
                        </div>
                        <div className="flex w-[23px] items-center justify-center rounded-full bg-primary p-1 text-white">
                           <FaXTwitter />
                        </div>
                        <div className="flex w-[23px] items-center justify-center rounded-full bg-primary p-1 text-white">
                           <FaLinkedinIn />
                        </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-[30px] font-poppins">
                     <div className="flex gap-[5px]">
                        <div className="h-[35px] w-[35px] rounded-full">
                           <Image
                              src="/assets/icons/launch-date.svg"
                              alt="d"
                              height={35}
                              width={35}
                           />
                        </div>
                        <div>
                           <p className="text-[11px] font-light">Launch Date</p>
                           <p className="text-[12px] font-medium text-black">
                              {moment(project?.createdAt).format(
                                 "DD MMMM, YYYY",
                              )}
                           </p>
                        </div>
                     </div>
                     <div className="flex justify-end gap-[5px]">
                        <div className="h-[35px] w-[35px] rounded-full">
                           <Image
                              src="/assets/icons/fund-goal.svg"
                              alt="fund"
                              height={35}
                              width={35}
                           />
                        </div>
                        <div>
                           <p className="text-[11px] font-light">
                              Fundraise Goal
                           </p>
                           <p className="text-[12px] font-medium text-black">
                              {project?.fundNeeded} BNB
                           </p>
                        </div>
                     </div>
                     <div className="flex gap-[5px]">
                        <div className="h-[35px] w-[35px] rounded-full">
                           <Image
                              src="/assets/icons/dollar-icon.svg"
                              alt="fund"
                              height={35}
                              width={35}
                           />
                        </div>
                        <div>
                           <p className="text-[11px] font-light">
                              Token Price for IDO
                           </p>
                           <p className="text-[12px] font-medium text-black">
                              {project?.tokenIdoPrice} BNB
                           </p>
                        </div>
                     </div>
                     <div className="flex justify-end gap-[5px]">
                        <div className="h-[35px] w-[35px] rounded-full">
                           <Image
                              src="/assets/icons/investors.svg"
                              alt="fund"
                              height={35}
                              width={35}
                           />
                        </div>
                        <div>
                           <p className="text-[11px] font-light">
                              Total Investors
                           </p>
                           <p className="text-[12px] font-medium text-black">
                              {project?.investorsCount}
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between gap-x-3 gap-y-4 pt-2">
                     {/* <div className="flex flex-col justify-between gap-1">
                        <span className="font-poppins text-[11px]">
                           Funds Remaining: ${remainingFunds}
                        </span>

                        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-[#B0BFD2]">
                           <div
                              className="h-2.5 rounded-full bg-[#0B5ECD]"
                              style={{ width: `${completedPercent}%` }}
                           ></div>
                           <div className="w-[50%] text-end font-poppins text-[10px] font-semibold text-black">
                              {completedPercent}%
                           </div>
                        </div>
                     </div> */}
                     <ProjectTolltip
                        remainingFunds={remainingFunds}
                        completedPercent={completedPercent}
                        totalRaise={project.totalInvestment}
                     />
                     {showControls && (
                        <div className="mt-2 flex items-center gap-1.5 text-2xl">
                           <button className="text-[#595bd4]">
                              <FaRegEdit onClick={handleEditClick} />
                           </button>
                           <button className="text-[#ff3131]">
                              <RiDeleteBin6Line onClick={handleDeleteClick} />
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </Link>

         <DeleteProjectAlert
            project={project}
            open={isDeleteAlertOpen}
            setOpen={setIsDeleteAlertOpen}
         />
      </>
   );
}

function DeleteProjectAlert({ project, open, setOpen }) {
   const queryClient = useQueryClient();

   const { mutate, isPending } = useMutation({
      mutationFn: deleteProject,
      onSuccess: async (res) => {
         toast.success(res?.data?.message);
         queryClient.invalidateQueries({ queryKey: ["active-projects"] });
         queryClient.invalidateQueries({ queryKey: ["pending-projects"] });
      },
      onError: (error) => {
         if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
         }
      },
      onSettled: () => {
         setOpen(false);
      },
   });

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent className="pb-[64px]">
            <div className="mb-8 flex items-center justify-between">
               <h2 className="font-poppins font-medium uppercase tracking-tight text-[#B0AECC] text-[11.px]">
                  Delete Project
               </h2>
               <AlertDialogCancelPrimitive>
                  <Image
                     src="/assets/icons/alert-cross.svg"
                     alt="close"
                     height={24}
                     width={24}
                  />
               </AlertDialogCancelPrimitive>
            </div>
            <p className="text-center font-poppins font-medium uppercase text-white">
               Are you sure you want to delete “{project.projectTitle}” ?
            </p>
            <AlertDialogFooter>
               <AlertDialogAction
                  className="bg-[#FA1C1C]"
                  onClick={() => mutate({ projectId: project?._id })}
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
