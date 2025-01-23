"use client";
import Header from "@/components/Home/header";
import InvestmentData from "@/components/Home/investment-data";
import NotificatoinsArea from "@/components/Home/notifications-area";
import ProjectsStatus from "@/components/Home/projects-status";
import { useStore } from "@/store";

export default function Home() {
   const user = useStore((state) => state.user);

   return (
      <div className="h-full">
         <Header />
         {user?.role === "creator" && <ProjectsStatus />}
         {user?.role === "investor" && <InvestmentData />}
         <NotificatoinsArea />
      </div>
   );
}
