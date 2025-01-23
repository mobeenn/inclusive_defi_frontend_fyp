import { cn } from "@/lib/utils";

export default function Label({
   className,
   children,
   variant = "default",
   ...props
}) {
   return (
      <label
         className={cn(
            "block text-sm font-semibold mb-2 sm:mb-3 text-primary",
            {
               "text-white text-[13px] font-medium font-poppins":
                  variant === "auth",
            },
            className
         )}
         {...props}
      >
         {children}
      </label>
   );
}
