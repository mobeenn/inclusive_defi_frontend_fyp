import CardTitle from "@/common/card-title";
import Link from "next/link";
import { Button } from "../ui/button";
import ActiveProjects from "./active-projects";
import PendingProjects from "./pending-projects";
import CompletedProjects from "./completed-projects";

export default function CreatorView() {
   return (
      <div className="space-y-6 sm:space-y-12">
         {/* Active Projects */}
         <section>
            <div className="flex items-end justify-between">
               <CardTitle className="uppercase">Active Projects</CardTitle>
               <Link href="/dashboard/add-new-project">
                  <Button
                     variant="custom"
                     className="!h-[35px] !px-5 text-[13px] normal-case"
                  >
                     Add New Project
                  </Button>
               </Link>
            </div>
            <ActiveProjects />
         </section>
         {/* Completed Projects */}
         <section>
            <div className="flex items-end justify-between">
               <CardTitle className="uppercase">Completed Projects</CardTitle>
            </div>
            <CompletedProjects />
         </section>

         {/* Pending Projects */}
         <section className="pb-4">
            <CardTitle className="uppercase">Pending Projects</CardTitle>
            <PendingProjects />
         </section>
      </div>
   );
}
