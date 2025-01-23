import Card from "@/components/Projects/Card";
import { cn } from "@/lib/utils";

export default function CardsGrid({
   projects,
   className,
   showControls = true,
}) {
   return (
      <div className={cn("mt-8 grid grid-cols-12 gap-5", className)}>
         {projects?.map((project) => (
            <div
               className="col-span-12 md:col-span-6 lg:col-span-4"
               key={project._id}
            >
               <Card project={project} showControls={showControls} />
            </div>
         ))}
      </div>
   );
}
