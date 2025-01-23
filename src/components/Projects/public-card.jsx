import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaRegEdit } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import moment from "moment";

export default function PublicCard({ project }) {
   const remainingFunds = project.fundNeeded - project.totalInvestment;
   const completedPercent = Math.round(
      (project.totalInvestment / project.fundNeeded) * 100,
   );

   return (
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
                        {moment(project?.createdAt).format("DD MMMM, YYYY")}
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
                     <p className="text-[11px] font-light">Fundraise Goal</p>
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
                     <p className="text-[11px] font-light">Total Investors</p>
                     <p className="text-[12px] font-medium text-black">
                        {project?.investorsCount}
                     </p>
                  </div>
               </div>
            </div>
            <div className="flex items-center justify-between gap-x-3 gap-y-4 pt-2">
               <div className="flex flex-col justify-between gap-1">
                  <span className="font-poppins text-[11px]">
                     Funds Remaining: {remainingFunds} BNB
                  </span>

                  <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-[#B0BFD2]">
                     <div
                        className="h-2.5 rounded-full bg-[#0B5ECD]"
                        style={{ width: `${completedPercent}%` }}
                     />
                     <div className="w-full text-center font-poppins text-[10px] font-semibold text-black">
                        {completedPercent}%
                     </div>
                  </div>
               </div>

               <Link href={`/projects/${project?._id}`}>
                  <button className="w-full rounded-[5px] bg-primary-landing px-2 py-1 font-poppins text-[13px] font-medium capitalize text-white transition-all hover:bg-primary-landing/90 active:bg-primary-landing/70">
                     View Details
                  </button>
               </Link>

               {/* <ProjectTolltip
                  remainingFunds={remainingFunds}
                  completedPercent={completedPercent}
                  totalRaise={project.totalInvestment}
               /> */}
            </div>
         </div>
      </div>
   );
}
