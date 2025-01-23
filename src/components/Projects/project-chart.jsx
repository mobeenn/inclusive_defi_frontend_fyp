"use client";

import { Pie, PieChart } from "recharts";

import {
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart";

export function ProjectChart({ remainingFunds, receivedFunds }) {
   const chartData = [
      {
         funds: "remaining",
         amount: +remainingFunds,
         fill: "var(--color-remaining)",
      },
      {
         funds: "received",
         amount: +receivedFunds,
         fill: "var(--color-received)",
      },
   ];

   const chartConfig = {
      remaining: {
         label: "Remaining BNB: ",
         color: "#274754",
      },
      received: {
         label: "Received BNB: ",
         color: "#732E60",
      },
   };

   return (
      <div className="flex flex-col">
         <div className="flex-1 pb-0">
            <ChartContainer
               config={chartConfig}
               className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square pb-0"
            >
               <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie data={chartData} dataKey="amount" nameKey="funds" />
               </PieChart>
            </ChartContainer>
         </div>

         {/* Chart Legend */}
         <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center gap-1">
               <div className="size-3 rounded-sm bg-[#274754]" />
               Remaining: {remainingFunds} BNB
            </div>

            <div className="flex items-center gap-1">
               <div className="size-3 rounded-sm bg-[#732E60]" />
               Received: {receivedFunds} BNB
            </div>
         </div>
      </div>
   );
}
