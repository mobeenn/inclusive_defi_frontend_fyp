"use client";
import Image from "next/image";
import NavItem from "./nav-item";
import { creatorNavLinks, investorNavLinks } from "@/lib/data";
import Link from "next/link";
import { useStore } from "@/store";

export default function NavContent({ closeNav }) {
   const user = useStore((state) => state.user);

   let navLinks = [];
   if (user?.role === "creator") {
      navLinks = creatorNavLinks;
   } else if (user?.role === "investor") {
      navLinks = investorNavLinks;
   }

   return (
      <>
         <div>
            <Link href="/" onClick={closeNav}>
               <Image
                  src={"/assets/images/logo-white.png"}
                  alt="logo"
                  width={200}
                  height={100}
                  className="mx-auto w-[7.875rem]"
               />
            </Link>
         </div>
         <div className="border-grad my-7" />
         <div className="h-[calc(100svh-210px)] overflow-y-hidden hover:overflow-y-auto xl:h-[calc(100svh-248px)]">
            <ul className="space-y-2">
               {navLinks.map((item) => (
                  <NavItem key={item.name} item={item} closeNav={closeNav} />
               ))}
            </ul>
         </div>
      </>
   );
}
