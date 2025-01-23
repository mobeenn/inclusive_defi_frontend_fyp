import CardTitle from "@/common/card-title";
import { useGetInvestmentsSummary } from "@/data/investments";
import Image from "next/image";
import Link from "next/link";

export default function InvestmentData() {
   const { data: investments } = useGetInvestmentsSummary();
   console.log("🚀 ~ InvestmentData ~ investments:", investments);
   return (
      <div>
         <CardTitle className="mb-8 mt-10 sm:mt-[4rem]">Investments</CardTitle>
         <div className="grid grid-cols-12 gap-4 sm:gap-8">
            <Card
               icon="/assets/icons/total-projects.svg"
               title="Total Projects"
               text="you're invested in"
               count={investments?.count || 0}
            />
            <Card
               icon="/assets/icons/dollar-coin.svg"
               title="Total Investment"
               text="Your total investment in projects"
               count={`${investments?.totalInvestment || 0} BNB`}
            />
            <CardLink />
         </div>
      </div>
   );
}

function Card({ icon, title, text, count }) {
   return (
      <div className="col-span-12 w-full rounded-xl bg-white p-6 text-center shadow-card sm:col-span-6 sm:rounded-2xl lg:col-span-4">
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

function CardLink() {
   return (
      <Link
         className="col-span-12 w-full rounded-xl bg-white p-6 text-center shadow-card sm:col-span-6 sm:rounded-2xl lg:col-span-4"
         href="/projects"
         target="_blank"
      >
         <div className="mx-auto flex aspect-square max-w-[12.5rem] items-center justify-center rounded-xl bg-accent">
            <Image
               src="/assets/icons/browse.svg"
               alt="browse"
               width={100}
               height={100}
               className="max-w-[6.25rem] shrink-0 @[15rem]:max-w-[6.25rem]"
            />
         </div>
         <div className="border-grad mx-auto mb-6 mt-[4.375rem] h-px max-w-[21.875rem]" />
         <h3 className="text-xl font-[600] leading-[30px] text-primary">
            Browse Projects
         </h3>
      </Link>
   );
}
