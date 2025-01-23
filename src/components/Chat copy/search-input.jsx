import { cn } from "@/lib/utils";

export default function SearchInput({ className, ...props }) {
   return (
      <input
         type="text"
         placeholder="Search..."
         style={{
            background:
               "url('/assets/icons/search-icon.svg') 10px 50% no-repeat",
         }}
         className={cn(
            "h-[30px] w-full border border-[#E2E8F0] outline-none placeholder:text-[#A0AEC0] placeholder:text-[10px] placeholder:font-light pl-[28px] pr-3 text-sm leading-8",
            className
         )}
         {...props}
      />
   );
}
