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

export default function PasswordTolltip({ variant = "default" }) {
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
               <div
                  className={cn("cursor-pointer text-accent", {
                     "text-[#D8A353] text-base": variant === "auth",
                  })}
                  onClick={() => setOpen(!open)}
               >
                  <BsInfoCircleFill />
               </div>
            </TooltipTrigger>
            <TooltipContent
               className={cn("font-medium max-w-[200px]", {
                  "text-white border-none bg-accent": variant === "default",
               })}
            >
               <p>
                  The password must contain a minimum of 8 characters,
                  with upper & lower case characters, a number and a symbol.
               </p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
}
