"use client";
import React from "react";
import Image from "next/image";
import {
   Menubar,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { BiSolidUser } from "react-icons/bi";
import { TbLogin } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { logout } from "@/lib/auth";
import { useStore } from "@/store";
import { useDisconnect } from "wagmi";
import { cn } from "@/lib/utils";
import { GoHomeFill } from "react-icons/go";
import { RiLockPasswordFill } from "react-icons/ri";

const menuLinks = [
   {
      name: "Dashboard",
      href: "/dashboard",
      icon: GoHomeFill,
   },
   {
      name: "Update Profile",
      href: "/dashboard/update-profile",
      icon: BiSolidUser,
   },
   {
      name: "Update Password",
      href: "/dashboard/update-password",
      icon: RiLockPasswordFill,
   },
];

export default function UserAvatar({ isDashboard = true }) {
   const { disconnect } = useDisconnect();
   const user = useStore((state) => state.user);

   const profileSrc =
      user?.profileImg && user?.profileImg !== "null"
         ? user?.profileImg
         : "/assets/images/default-avatar.png";

   function handleLogout() {
      disconnect();
      logout();
   }

   return (
      <Menubar>
         <MenubarMenu>
            <MenubarTrigger>
               <div className="flex cursor-pointer items-center gap-1.5 text-white">
                  <Image
                     src={profileSrc}
                     alt="user"
                     width={26}
                     height={26}
                     className="aspect-square size-[1.625rem] rounded-[3px] object-cover"
                  />

                  <p className="hidden text-[13px] font-medium sm:block">
                     {user?.name}
                  </p>
                  <FaChevronDown className="text-xs" />
               </div>
            </MenubarTrigger>
            <MenubarContent
               className={cn(
                  "w-[142px] rounded-[10px] border-none p-3 font-[300]",
                  isDashboard && "bg-accent text-white",
               )}
            >
               {menuLinks?.map(({ name, href, icon: Icon }) => (
                  <React.Fragment key={href}>
                     <MenubarItem
                        asChild
                        className={cn(
                           "cursor-pointer rounded-md px-3 py-2.5 text-[13px] font-medium transition-all focus:bg-gray-200",
                           isDashboard &&
                              "font-normal focus:bg-[#0a1a46] focus:text-white",
                        )}
                     >
                        <Link href={href} className="flex items-center gap-1">
                           {Icon && <Icon />}
                           {name}
                        </Link>
                     </MenubarItem>

                     <div className="my-2 w-full border border-white" />
                  </React.Fragment>
               ))}

               <MenubarItem
                  asChild
                  className={cn(
                     "cursor-pointer rounded-md px-3 py-2.5 text-[13px] font-medium transition-all focus:bg-gray-200",
                     isDashboard &&
                        "font-normal focus:bg-[#0a1a46] focus:text-white",
                  )}
               >
                  <button
                     onClick={handleLogout}
                     className="flex w-full items-center gap-1"
                  >
                     <TbLogin />
                     Logout
                  </button>
               </MenubarItem>
            </MenubarContent>
         </MenubarMenu>
      </Menubar>
   );
}
