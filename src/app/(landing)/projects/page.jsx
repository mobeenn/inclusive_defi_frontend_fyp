"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGetAllPublicProjects } from "@/data/projects";
import PublicCard from "@/components/Projects/public-card";

const Projects = () => {
   const [pageLimit, setPageLimit] = useState(12);
   const [selectedStatus, setSelectedStatus] = useState("all");

   const {
      data: projects,
      isPending,
      isPlaceholderData,
   } = useGetAllPublicProjects({
      page: 1,
      perPage: pageLimit,
      status: selectedStatus,
   });

   const handleLoadMore = () => {
      setPageLimit(pageLimit + 8);
   };

   return (
      <div className="relative overflow-hidden">
         <div className="relative min-h-[390px] w-full overflow-hidden bg-primary-landing py-[60px] pt-[50px]">
            <div className="absolute left-[70%] top-[100px] z-[1] h-[776px] w-[1260px] -translate-x-1/2 -translate-y-1/2 rotate-[163deg] transform">
               <Image
                  src={"/assets/landing/images/home/bg-wave.png"}
                  className="w-full object-cover"
                  alt="bg"
                  width={1000}
                  height={1000}
               />
            </div>
            <div className="absolute left-[20%] top-[80px] z-[1] h-[598px] w-[1226px] -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] transform">
               <Image
                  src={"/assets/landing/images/home/bg-wave.png"}
                  className="w-full object-cover"
                  alt="bg"
                  width={1000}
                  height={1000}
               />
            </div>
            <div className="relative z-[5] mx-auto flex w-[90%] max-w-[891px] flex-col items-center justify-center gap-[41px] rounded-[15px] bg-white py-10">
               <p className="px-2 text-center font-roboto font-semibold uppercase text-primary-landing sm:text-lg">
                  browse the exclusive projects
               </p>
               <div className="flex flex-col gap-3 px-6 sm:flex-row md:gap-[34px]">
                  <div
                     className="relative flex h-[120px] w-[130px] cursor-pointer flex-col items-center justify-center gap-[10px] rounded-[15px] border-[1px] border-[#E2E8F0]"
                     onClick={() => {
                        setSelectedStatus("active");
                        setPageLimit(12);
                     }}
                  >
                     <Image
                        src="/assets/landing/icons/active.svg"
                        className="h-auto w-[72px]"
                        alt="icons-ref-1"
                        width={72}
                        height={72}
                     />
                     <p className="font-roboto text-xs font-semibold uppercase text-text">
                        Active
                     </p>
                     <Image
                        src="/assets/landing/icons/projects/active.svg"
                        alt="active"
                        className="absolute right-[-10px] top-[-10px]"
                        width={30}
                        height={30}
                     />
                  </div>
                  <div
                     className="relative flex h-[120px] w-[130px] cursor-pointer flex-col items-center justify-center gap-[10px] rounded-[15px] border-[1px] border-[#E2E8F0]"
                     onClick={() => {
                        setSelectedStatus("pending");
                        setPageLimit(12);
                     }}
                  >
                     <Image
                        src="/assets/landing/icons/active.svg"
                        className="h-auto w-[72px]"
                        alt="icons-ref-2"
                        width={72}
                        height={72}
                     />
                     <p className="font-roboto text-xs font-semibold uppercase text-text">
                        Pending
                     </p>
                     <Image
                        src="/assets/landing/icons/projects/pending.svg"
                        alt="pending"
                        className="absolute right-[-10px] top-[-10px]"
                        width={30}
                        height={30}
                     />
                  </div>
                  <div
                     className="relative flex h-[120px] w-[130px] cursor-pointer flex-col items-center justify-center gap-[10px] rounded-[15px] border-[1px] border-[#E2E8F0]"
                     onClick={() => {
                        setSelectedStatus("completed");
                        setPageLimit(12);
                     }}
                  >
                     <Image
                        src="/assets/landing/icons/active.svg"
                        className="h-auto w-[72px]"
                        alt="icons-ref-3"
                        width={72}
                        height={72}
                     />
                     <p className="font-roboto text-xs font-semibold uppercase text-text">
                        Completed
                     </p>
                     <Image
                        src="/assets/landing/icons/projects/completed.svg"
                        alt="completed"
                        className="absolute right-[-10px] top-[-10px]"
                        width={30}
                        height={30}
                     />
                  </div>
               </div>
            </div>
         </div>

         <div className="flex flex-col items-center justify-center bg-white pb-[30px]">
            <div className="mt-6 flex w-[85%] flex-col justify-between md:flex-row">
               <p className="self-start text-sm font-medium text-[#4C4C66]">
                  SEARCH FOR:{" "}
                  {selectedStatus && (
                     <>
                        <span className="font-bold">Status: </span>
                        <span className="capitalize text-gray-500/80">
                           {selectedStatus}{" "}
                        </span>
                     </>
                  )}
               </p>
               <button
                  className="xs:max-w-[130px] w-full max-w-[110px] rounded-[5px] bg-primary-landing py-1 font-poppins text-[13px] font-medium capitalize text-white transition-all hover:bg-primary-landing/90 active:bg-primary-landing/70"
                  onClick={() => {
                     setSelectedStatus("all");
                     setPageLimit(12);
                  }}
               >
                  Clear Filters
               </button>
            </div>
            <div
               className={cn(
                  "mb-[30px] mt-[40px] grid w-full grid-cols-1 flex-col gap-x-[10px] gap-y-[30px] px-4 sm:px-[45px] md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
                  isPlaceholderData && "opacity-50",
               )}
            >
               {/* {isPending && <h2 className="text-center">Loading...</h2>} */}
               {projects?.projectsWithStats?.length > 0 ? (
                  projects?.projectsWithStats?.map((item) => (
                     <PublicCard key={item._id} project={item} />
                  ))
               ) : (
                  <h6 className="text-center">No Project Found</h6>
               )}
            </div>

            {projects?.count > projects?.projectsWithStats?.length && (
               <button
                  className="primary-button h-[41px] w-[165px] rounded-md font-poppins font-medium uppercase text-white"
                  onClick={handleLoadMore}
                  disabled={isPending}
               >
                  Load more
               </button>
            )}
         </div>
      </div>
   );
};

export default Projects;
