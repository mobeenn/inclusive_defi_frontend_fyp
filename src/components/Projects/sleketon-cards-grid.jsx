import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonCardsGrid({ className }) {
   return (
      <div className={cn("mt-8 grid grid-cols-12 gap-5", className)}>
         {/* Card */}
         {Array(3)
            .fill(0)
            .map((_, index) => (
               <div
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                  key={index}
               >
                  <div className="w-auto shadow-[0px_4px_4px_0px_#C6C1C140]">
                     <Skeleton className="h-[200px] w-full rounded-none" />
                     {/* Card Body */}
                     <div className="flex flex-col gap-[20px] px-3 py-[12px] pb-[32px] sm:px-[20px]">
                        <div className="flex items-center justify-between gap-x-5">
                           <Skeleton className="h-7 flex-1 rounded" />
                           <div className="flex flex-1 justify-end gap-[10px]">
                              <Skeleton className="size-7 rounded-full" />
                              <Skeleton className="size-7 rounded-full" />
                              <Skeleton className="size-7 rounded-full" />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 gap-y-[30px] font-poppins">
                           {Array(4)
                              .fill(0)
                              .map((_, index) => (
                                 <div key={index} className="flex gap-[5px]">
                                    <Skeleton className="size-10 rounded-full" />
                                    <div className="flex-1">
                                       <Skeleton className="mb-1 h-4 w-full rounded" />
                                       <Skeleton className="h-4 w-full rounded" />
                                    </div>
                                 </div>
                              ))}
                        </div>
                        <div className="flex items-start justify-between gap-x-5 gap-y-4 pt-2">
                           <div className="flex flex-1 flex-col justify-between gap-1">
                              <Skeleton className="h-2.5 w-full rounded-full" />
                              <Skeleton className="h-2.5 w-full rounded-full" />
                           </div>
                           <div className="flex flex-1 items-center justify-end gap-1.5 text-2xl">
                              <Skeleton className="h-7 w-6" />
                              <Skeleton className="h-7 w-6" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
      </div>
   );
}
