import { cn } from "@/lib/utils";

export default function Textarea({ className, error, ...props }) {
   return (
      <div className="relative w-full">
         <textarea
            className={cn(
               "w-full min-h-[150px] py-3 px-5 text-sm placeholder:text-[#A0AEC0] placeholder:font-[300] border border-[#E2E8F0] outline-none focus:ring-1 ring-gray-200 transition-all resize-none",
               className
            )}
            {...props}
         ></textarea>
         {error && (
            <p className="absolute -mt-1 text-sm font-medium text-red-500">
               {error}
            </p>
         )}
      </div>
   );
}
