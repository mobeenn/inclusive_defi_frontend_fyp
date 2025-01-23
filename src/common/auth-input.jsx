"use client";

import { cn } from "@/lib/utils";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";

export default function AuthInput({
   className,
   type = "text",
   error,
   ...props
}) {
   const [isPasswordShown, setIsPasswordShown] = useState(false);

   return (
      <div className="relative w-full">
         {type !== "password" ? (
            <input
               className={cn(
                  "px-4 sm:px-[28px] w-full h-10 rounded text-[#0a0a0a] text-sm placeholder:text-xs placeholder:text-black/50 outline-none",
                  className
               )}
               type={type}
               {...props}
            />
         ) : (
            <div className="relative w-full">
               <input
                  className={cn(
                     "px-4 sm:px-[28px] w-full h-10 rounded text-[#0a0a0a] text-sm placeholder:text-xs placeholder:text-black/50 outline-none",
                     className
                  )}
                  type={isPasswordShown ? "text" : "password"}
                  {...props}
               />
               <span
                  className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 right-3 sm:right-5"
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
            <p className="text-red-500 text-sm absolute mt-0.5">{error}</p>
         )}
      </div>
   );
}
