"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ item, closeNav }) {
   const newMessages = useStore((state) => state.newMessages);
   const currentChat = useStore((state) => state.currentChat);
   const pathname = usePathname();
   const isActive = item.href === pathname;
   // const editedItemHref = item.href.slice(1);

   // if (item.href === "/" && pathname === item.href) {
   //    isActive = true;
   // } else if (editedItemHref === "") {
   //    isActive = false;
   // } else {
   //    isActive = pathname.startsWith(item.href);
   // }

   const excludedCurrentChatNewMessages = newMessages?.filter(
      (message) => message.chatId !== currentChat?._id,
   );

   return (
      <li>
         <Link
            className={cn(
               "relative flex h-[3.75rem] items-center gap-2 rounded-[0.9375rem] px-4 transition-all",
               isActive
                  ? "bg-white text-primary shadow-card"
                  : "text-[#A0AEC0] hover:bg-[#1A173E]",
            )}
            href={item.href}
            onClick={closeNav}
         >
            <div
               className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  isActive ? "bg-accent" : "bg-white shadow-card",
               )}
            >
               <Image
                  src={isActive ? item.iconActive : item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  className="object-cover"
               />
            </div>
            <span className="text-sm font-[600]">{item.name}</span>

            {item.href === "/dashboard/chat" &&
               excludedCurrentChatNewMessages.length > 0 && (
                  <p
                     className={cn(
                        "absolute right-3 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-semibold text-accent",
                        isActive && "bg-accent text-white",
                     )}
                  >
                     {excludedCurrentChatNewMessages.length}
                  </p>
               )}
         </Link>
      </li>
   );
}
