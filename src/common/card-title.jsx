import { cn } from "@/lib/utils";

export default function CardTitle({ children, className }) {
   return (
      <h2 className={cn("text-primary font-[600] text-lg", className)}>
         {children}
      </h2>
   );
}
