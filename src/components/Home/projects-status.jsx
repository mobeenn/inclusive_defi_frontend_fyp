import CardTitle from "@/common/card-title";
import { useGetProjectsSummary } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsStatus() {
   const { data: projectsSummary } = useGetProjectsSummary();

   return (
      <div className="mt-10 rounded-xl bg-white px-3 py-5 shadow-card sm:mt-[4.625rem] sm:rounded-2xl sm:px-[1.375rem] sm:py-[1.75rem]">
         <CardTitle>Dashboard</CardTitle>

         <div className="my-5 flex flex-col gap-5 sm:my-10 md:flex-row lg:gap-9">
            <div className="grid basis-[62%] grid-cols-12 gap-3 sm:gap-5">
               <StatusCard
                  key={"active"}
                  status={"active"}
                  count={projectsSummary?.active_projects}
               />
               <StatusCard
                  key={"pending"}
                  status={"pending"}
                  count={projectsSummary?.pending_projects}
               />
               <StatusCard
                  key={"completed"}
                  status={"completed"}
                  count={projectsSummary?.completed_projects}
               />

               <StatusCard variant="new" />
            </div>
            <div className="flex-1">
               <Card
                  icon="/assets/icons/funding-received.svg"
                  title="Funding Received"
                  text="Funding received for your projects"
                  count={"$ " + projectsSummary?.received_funding}
               />
            </div>
         </div>
      </div>
   );
}

const className =
   "@container col-span-6 [@media(min-width:860px)]:!col-span-3 grid @[15rem]:gap-10 rounded-2xl border border-[#E2E8F0] aspect-square";

function StatusCard({ variant = "default", status, count }) {
   return (
      <div className="col-span-6 grid rounded-2xl border border-[#E2E8F0] @container @[15rem]:gap-10">
         {variant === "default" && (
            <div className="flex flex-col items-center justify-center gap-1 p-3 @[12rem]:gap-6 @[12rem]:p-[1.875rem]">
               <div className="flex w-full flex-col items-center justify-center gap-2 @[12rem]:flex-row @[12rem]:gap-10">
                  <div className="relative">
                     <Image
                        src="/assets/icons/projects-status.svg"
                        alt="status"
                        width={100}
                        height={85}
                        className="max-w-[2.5rem] @[15rem]:max-w-[5rem] sm:max-w-[3.75rem]"
                     />
                     <span className="absolute -right-3 -top-3">
                        <Image
                           src={`/assets/icons/${status}-projects.svg`}
                           alt="active"
                           width={35}
                           height={35}
                           className="size-6 sm:size-[2.1875rem]"
                        />
                     </span>
                  </div>
                  <span className="text-xl font-[600] @[15rem]:text-[50px] sm:text-3xl">
                     {count}
                  </span>
               </div>
               <div>
                  <h3 className="text-center text-xs font-[600] uppercase text-[#414040] sm:text-base">
                     {status}
                  </h3>
                  <h3 className="-mt-1 text-center text-xs font-[600] uppercase text-[#414040] sm:text-base">
                     projects
                  </h3>
               </div>
            </div>
         )}
         {variant === "new" && (
            <Link
               href="/add-new-project"
               className={
                  "flex flex-col items-center justify-center gap-1 p-3 @[12rem]:gap-6 @[12rem]:p-[1.875rem]"
               }
            >
               <Image
                  src={"/assets/icons/gold-plus.svg"}
                  alt="plus"
                  width={106}
                  height={93}
                  className="max-w-[3.75rem] @[15rem]:max-w-[3.75rem]"
               />
               <div>
                  <h3 className="text-center text-xs font-[600] uppercase text-[#414040] sm:text-base">
                     create new
                  </h3>
                  <h3 className="text-center text-xs font-[600] uppercase text-[#414040] sm:text-base">
                     project
                  </h3>
               </div>
            </Link>
         )}
      </div>
   );
}

function Card({ icon, title, text, count }) {
   return (
      <div className="col-span-12 w-full rounded-xl border border-[#E2E8F0] bg-white p-6 text-center shadow-card sm:col-span-6 sm:rounded-2xl lg:col-span-4">
         <div className="mx-auto flex aspect-[1.333] max-w-[12.5rem] items-center justify-center rounded-xl bg-accent">
            <Image
               src={icon}
               alt={title}
               width={100}
               height={85}
               className="max-w-[3.75rem] @[15rem]:max-w-[5rem]"
            />
         </div>
         <div className="mt-5">
            <h3 className="text-xl font-[600] leading-[30px] text-primary">
               {title.split(" ")[0]}
            </h3>
            <h3 className="text-xl font-[600] leading-[30px] text-primary">
               {title.split(" ")[1]}
            </h3>
         </div>
         <p className="mb-4 mt-2 text-sm font-[600] text-[#A0AEC0]">{text}</p>
         <div className="border-grad mx-auto h-px max-w-[21.875rem]" />
         <h3 className="mt-2 text-[2rem] font-[600] text-primary sm:mt-4">
            {count}
         </h3>
      </div>
   );
}
