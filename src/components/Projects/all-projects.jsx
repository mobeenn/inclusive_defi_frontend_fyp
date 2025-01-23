"use client";
import React from "react";
import Pagination from "@/common/pagination";
import CardsGrid from "./CardsGrid";
import { useGetAllProjects } from "@/data/projects";
import SkeletonCardsGrid from "./sleketon-cards-grid";
import Image from "next/image";

export default function AllProjects() {
   const [currentPage, setCurrentPage] = React.useState(1);
   const [perPage, setPerPage] = React.useState(3);

   const {
      data: { data: projects, count } = {},
      isPending,
      isPlaceholderData,
   } = useGetAllProjects({
      page: currentPage,
      perPage,
   });

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
               <p className="font-medium text-gray-800">No Projects Found!</p>
            </div>
         )}

         {projects?.length > 0 && (
            <CardsGrid
               className={isPlaceholderData && "pointer-events-none opacity-50"}
               projects={projects}
               showControls={false}
            />
         )}

         {projects?.length > 0 && (
            <Pagination
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               perPage={perPage}
               setPerPage={setPerPage}
               totalPages={count || 1}
               perPageOptions={[3, 6, 9]}
            />
         )}
      </>
   );
}
