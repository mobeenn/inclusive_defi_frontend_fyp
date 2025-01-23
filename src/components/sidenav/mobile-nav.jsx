"use client";

import { Button } from "@/components/ui/button";
import { IoMenu } from "react-icons/io5";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavContent from "./nav-content";
import { useState } from "react";

export function MobileNav() {
   const [open, setOpen] = useState(false);
   const closeNav = () => {
      setOpen(false);
      console.log("closed");
   };
   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <Button variant="ghost" className="p-2 text-[1.625rem] text-white">
               <IoMenu />
            </Button>
         </SheetTrigger>
         <SheetContent
            side="left"
            className="bg-accent-dark chat-sidebar-scroll"
         >
            <NavContent closeNav={closeNav} />
         </SheetContent>
      </Sheet>
   );
}
