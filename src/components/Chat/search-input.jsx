import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { useEffect, useState } from "react";

export default function SearchInput({ className, ...props }) {
   const [query, setQuery] = useState("");
   const debouncedQuery = useDebounce(query);
   const setChatSearchQuery = useStore((state) => state.setChatSearchQuery);
   const chatSearchQuery = useStore((state) => state.chatSearchQuery);

   function handleInputChange(e) {
      setQuery(e.target.value);
   }

   useEffect(() => {
      setChatSearchQuery(debouncedQuery);
   }, [debouncedQuery, setChatSearchQuery]);

   useEffect(() => {
      if (chatSearchQuery === "") {
         setQuery("");
      }
   }, [chatSearchQuery, setQuery]);

   return (
      <div className="flex items-center gap-2">
         <input
            type="text"
            placeholder="Search Investors or Creators..."
            style={{
               background:
                  "url('/assets/icons/search-icon.svg') 10px 50% no-repeat",
            }}
            className={cn(
               "h-[30px] w-full border border-[#E2E8F0] pl-[28px] pr-3 text-sm leading-8 outline-none placeholder:text-[10px] placeholder:font-light placeholder:text-[#A0AEC0]",
               className,
            )}
            value={query}
            onChange={handleInputChange}
            {...props}
         />
      </div>
   );
}
