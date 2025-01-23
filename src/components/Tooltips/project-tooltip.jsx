"useState";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BsInfoCircleFill } from "react-icons/bs";
import { useState } from "react";

export default function ProjectTolltip({
   variant = "default",
   remainingFunds,
   completedPercent,
   totalRaise,
}) {
   const [open, setOpen] = useState(false);
   return (
      <TooltipProvider delayDuration={200}>
         <Tooltip
            onOpenChange={(e) => {
               setOpen(e);
            }}
            open={open}
         >
            <TooltipTrigger asChild>
               <div className="flex flex-col justify-between gap-1">
                  <span className="font-poppins text-[11px]">
                     Funds Remaining: ${remainingFunds}
                  </span>

                  <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-[#B0BFD2]">
                     <div
                        className="h-2.5 rounded-full bg-[#0B5ECD]"
                        style={{ width: `${completedPercent}%` }}
                     ></div>
                     <div className="w-full text-center font-poppins text-[10px] font-semibold text-black">
                        {completedPercent}%
                     </div>
                  </div>
               </div>
            </TooltipTrigger>
            <TooltipContent
               className={cn("max-w-[200px] font-medium", {
                  "border-none bg-accent text-white": variant === "default",
               })}
            >
               <p>Total Raise: ${totalRaise}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
}
