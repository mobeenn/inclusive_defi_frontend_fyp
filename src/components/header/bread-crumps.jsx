"use client";

import { usePathname } from "next/navigation";
import { creatorAllRoutes, investorAllRoutes } from "@/lib/data";
import { useStore } from "@/store";
import { useSearchParams } from "next/navigation";

export default function BreadCrumps() {
   const pathname = usePathname();
   const query = useSearchParams();
   const user = useStore((state) => state.user);

   let allRoutes = [];
   if (user?.role === "creator") {
      allRoutes = creatorAllRoutes;
   } else if (user?.role === "investor") {
      allRoutes = investorAllRoutes;
   }

   let url = allRoutes.find((route) => route.href === pathname)?.name;
   let title = url;

   if (pathname.startsWith("/dashboard/projects/")) {
      url = "Projects / " + query.get("name");
      title = query.get("name");
   }

   if (pathname.startsWith("/dashboard/edit-project/")) {
      url = "Edit Project / " + query.get("name");
      title = query.get("name");
   }

   return (
      <div className="hidden text-white sm:block">
         <p className="text-xs">
            <span className="text-[#A0AEC0]">Pages</span> / {url}
         </p>
         <p className="mt-1 text-sm font-medium">{title}</p>
      </div>
   );
}
