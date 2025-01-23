"use client";
import { useGetMyNotifications } from "@/data/projects";
import NotificationItem from "../header/notification-item";
import moment from "moment";

export default function NotificatoinsArea() {
   const { data: { data: notifications, count } = {} } = useGetMyNotifications({
      page_number: 1,
      limit: 10000,
   });
   return (
      <div
         id="notifications"
         className="notifications-scroll mt-8 rounded-[10px] bg-accent text-[#B1AFCD] shadow-[1px_0px_50px_0px_#C7C7C78C]"
      >
         <h2 className="pl-6 pt-3 text-sm font-medium uppercase">
            Notifications
         </h2>
         <div className="mt-3 max-h-[300px] space-y-5 overflow-y-auto pb-5">
            {notifications?.length === 0 && (
               <p className="text-center text-sm">No notifications found.</p>
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
         </div>
      </div>
   );
}
