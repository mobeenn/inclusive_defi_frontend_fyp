import { cn } from "@/lib/utils";

export function Select({
   className,
   children,
   error,
   variant = "default",
   ...props
}) {
   return (
      <div className="relative w-full">
         <select
            className={cn(
               "h-10 w-full cursor-pointer border border-[#E2E8F0] px-3 text-sm outline-none ring-gray-200 transition-all placeholder:font-[300] placeholder:text-[#A0AEC0] focus:ring-1 sm:px-5",
               {
                  "rounded px-4 text-sm text-[#0a0a0a] focus:ring-0 sm:px-6":
                     variant === "auth",
               },
               className,
            )}
            {...props}
         >
            {children}
         </select>
         {error && (
            <p className="absolute mt-0.5 text-sm font-medium text-red-500">
               {error}
            </p>
         )}
      </div>
   );
}

export function SelectOption({ className, children, ...props }) {
   return (
      <option className={cn("py-2", className)} {...props}>
         {children}
      </option>
   );
}
