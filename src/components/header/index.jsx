import { MobileNav } from "../sidenav/mobile-nav";
import Notifications from "./notifications";
import UserAvatar from "./user-avatar";
import BreadCrumps from "./bread-crumps";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
   return (
      <div className="mb-3 flex h-[4.375rem] items-center justify-between rounded-lg bg-accent px-3 sm:px-8 xl:mb-5">
         <div className="flex items-center gap-3">
            <div className="xl:hidden">
               <MobileNav />
            </div>
            <BreadCrumps />
         </div>
         <div className="flex items-center gap-4">
            <Notifications />
            <ConnectButton chainStatus={"icon"} accountStatus={"avatar"} />
            <UserAvatar />
         </div>
      </div>
   );
}
