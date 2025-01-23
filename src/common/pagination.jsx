import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function Pagination({
   currentPage,
   setCurrentPage,
   perPage,
   setPerPage,
   totalPages,
   perPageOptions = [5, 10, 15, 20],
}) {
   function handlePageChange(page) {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
   }

   useEffect(() => {
      setCurrentPage(1);
   }, [perPage, setCurrentPage]);

   return (
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
         {/* Per Page */}
         <div className="flex items-center gap-2">
            <p className="hidden text-sm font-medium text-gray-600 sm:block">
               Showing
            </p>
            <select
               defaultValue={perPage}
               onChange={(e) => setPerPage(e.target.value)}
               className="h-[30px] w-12 cursor-pointer rounded border bg-white px-0.5 shadow outline-none"
            >
               {perPageOptions.map((option) => (
                  <option key={option} value={option}>
                     {option}
                  </option>
               ))}
            </select>
            <p className="hidden text-sm font-medium text-gray-600 sm:block">
               per page
            </p>
         </div>

         {/* Pagination */}
         <div className="flex h-[30px] items-center gap-2 rounded text-sm font-medium">
            <button
               className={cn(
                  "flex h-full w-8 items-center justify-center rounded border bg-white shadow transition-all",
                  currentPage === 1 ? "opacity-40" : "active:bg-gray-100",
               )}
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1}
            >
               <FaChevronLeft />
            </button>

            <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
               <span className="hidden sm:block">Page</span>
               <span className="font-semibold text-gray-800">
                  {currentPage}
               </span>
               of
               <span className="font-semibold text-gray-800">{totalPages}</span>
            </p>

            <button
               className={cn(
                  "flex h-full w-8 items-center justify-center rounded border bg-white shadow transition-all",
                  currentPage === totalPages
                     ? "opacity-40"
                     : "active:bg-gray-100",
               )}
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === totalPages}
            >
               <FaChevronRight />
            </button>
         </div>
      </div>
   );
}
