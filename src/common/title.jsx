import { cn } from "@/lib/utils";

export default function Title({ children, className }) {
   return (
      <h1 className={cn("text-primary font-[600] text-sm", className)}>
         {children}
      </h1>
   );
}
