"use client";
import { TbBellFilled } from "react-icons/tb";
import {
   Menubar,
   MenubarContent,
   MenubarMenu,
   MenubarTrigger,
} from "@/components/ui/menubar";
import NotificationItem from "./notification-item";
import { useGetMyNotifications } from "@/data/projects";
import moment from "moment";
import { useState } from "react";
import Link from "next/link";

export default function Notifications() {
   const [newLimit, setNewLimit] = useState(8);

   const { data: { data: notifications, count } = {} } = useGetMyNotifications({
      page_number: 1,
      limit: newLimit,
   });

   return (
      <Menubar>
         <MenubarMenu>
            <MenubarTrigger asChild>
               <button className="relative">
                  <TbBellFilled className="cursor-pointer text-2xl text-white" />
                  {notifications?.length > 0 && (
                     <div className="pointer-events-none absolute right-0.5 top-0.5 size-2.5 rounded-full bg-red-600" />
                  )}
               </button>
            </MenubarTrigger>
            <MenubarContent className="w-[300px] rounded-[10px] border-none bg-accent text-[#B1AFCD] sm:w-[380px]">
               <h2 className="pl-6 pt-3 text-[11px] font-medium uppercase">
                  Notifications
               </h2>

               <div className="mt-3 max-h-[300px] space-y-5 overflow-y-auto pb-5">
                  {notifications?.length === 0 && (
                     <p className="text-center text-sm">
                        No notifications found.
                     </p>
                  )}

                  {notifications?.map((data, idx) => {
                     return (
                        <NotificationItem
                           title={data?.notificationType}
                           key={idx}
                           // title="Project Approved"
                           projectName={data?.notificationMessage}
                           time={moment(data?.createdAt).format("LLL")}
                        />
                     );
                  })}

                  {/* <NotificationItem
                     title="Project Approved"
                     projectName="project 1"
                     time="3 hours ago"
                  /> */}
                  {/* <NotificationItem
                     title="Project Rejected"
                     projectName="project 1"
                     time="3 hours ago"
                  />
                  <NotificationItem
                     title="Funds Received"
                     projectName="project 1"
                     amount="500"
                     investorName="investor 1"
                     time="3 hours ago"
                  /> */}
               </div>
               {/* <p
                  className="cursor-pointer pb-3 text-center text-[11px] text-[#F39423]"
                  onClick={() => {
                     setNewLimit(newLimit + 8);
                  }}
               >
                  See More
               </p> */}
               <Link
                  href="/dashboard#notifications"
                  className="block cursor-pointer pb-3 text-center text-[11px] text-[#F39423]"
               >
                  See More
               </Link>
            </MenubarContent>
         </MenubarMenu>
      </Menubar>
   );
}
