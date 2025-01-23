"use client";
import React from "react";
import Pagination from "@/common/pagination";
import CardsGrid from "./CardsGrid";
import { useGetAllActiveProjects } from "@/data/projects";
import SkeletonCardsGrid from "./sleketon-cards-grid";
import Image from "next/image";

export default function ActiveProjects() {
   const [currentPage, setCurrentPage] = React.useState(1);
   const [perPage, setPerPage] = React.useState(3);

   const {
      data: { data: projects, totalPages } = {},
      isPending,
      isPlaceholderData,
   } = useGetAllActiveProjects({
      page: currentPage,
      perPage,
   });
   
   console.log("🚀 ~ ActiveProjects ~ projects:", projects)
   // console.log(data);

   return (
      <>
         {isPending && <SkeletonCardsGrid />}

         {projects?.length === 0 && (
            <div className="mt-8 flex flex-col items-center justify-center gap-5 text-center">
               <Image
                  src="/assets/icons/no-data.svg"
                  alt="No data"
                  width={200}
                  height={200}
               />
               <p className="font-medium text-gray-800">
                  No Active Project Found!
               </p>
            </div>
         )}

         {projects?.length > 0 && (
            <CardsGrid
               className={isPlaceholderData && "pointer-events-none opacity-50"}
               projects={projects}
            />
         )}

         {projects?.length > 0 && (
            <Pagination
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               perPage={perPage}
               setPerPage={setPerPage}
               totalPages={totalPages || 1}
               perPageOptions={[3, 6, 9]}
            />
         )}
      </>
   );
}
