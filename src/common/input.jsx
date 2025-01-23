"use client";
import { cn } from "@/lib/utils";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";

export default function Input({
   className,
   type = "text",
   error,
   allowDecimal = true,
   ...props
}) {
   const [isPasswordShown, setIsPasswordShown] = useState(false);

   const handleKeyDown = (e) => {
      if (type === "number" && !allowDecimal) {
         if (e.key === "." || e.key === "," || e.key === "e" || e.key === "E") {
            e.preventDefault();
         }
      }
      if (type === "number" && allowDecimal) {
         if (e.key === "e" || e.key === "E") {
            e.preventDefault();
         }
      }
   };

   return (
      <div className="relative w-full">
         {type !== "password" ? (
            <input
               className={cn(
                  "h-10 w-full border border-[#E2E8F0] px-3 text-sm outline-none ring-gray-200 transition-all placeholder:font-[300] placeholder:text-[#A0AEC0] focus:ring-1 sm:px-5",
                  error && "border-red-500 ring-red-500",
                  className,
               )}
               type={type}
               onKeyDown={handleKeyDown}
               {...props}
            />
         ) : (
            <div className="relative">
               <input
                  className={cn(
                     "h-10 w-full border border-[#E2E8F0] px-3 text-sm outline-none ring-gray-200 transition-all placeholder:font-[300] placeholder:text-[#A0AEC0] focus:ring-1 sm:px-5",
                     error && "border-red-500 ring-red-500",
                     className,
                  )}
                  type={isPasswordShown ? "text" : "password"}
                  {...props}
               />
               <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer sm:right-5"
                  onClick={() => setIsPasswordShown(!isPasswordShown)}
               >
                  {isPasswordShown ? (
                     <IoEyeOff className="text-[22px] text-accent-dark" />
                  ) : (
                     <IoEye className="text-[22px] text-accent-dark" />
                  )}
               </span>
            </div>
         )}
         {error && (
            <p className="absolute mt-0.5 text-sm font-medium text-red-500">
               {error}
            </p>
         )}
      </div>
   );
}
