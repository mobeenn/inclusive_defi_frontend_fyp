import {
   Sheet,
   SheetContent,
   SheetTrigger,
   SheetClose,
} from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { landingPageNavLinks } from "@/lib/data";

export default function MobileNav() {
   const isLoggedIn = false;

   return (
      <nav className="lg:hidden">
         <Sheet>
            <SheetTrigger asChild>
               <button>
                  <IoMenu className="text-2xl" />
               </button>
            </SheetTrigger>
            <SheetContent className="bg-primary-landing">
               <div className="grid gap-4 pb-6 pt-12">
                  <ul>
                     {landingPageNavLinks.map((item, index) => (
                        <SheetClose asChild key={index}>
                           <li className="my-5 font-poppins text-xl text-white hover:text-gray-400">
                              <a href={item.link}>{item.label}</a>
                           </li>
                        </SheetClose>
                     ))}
                  </ul>
               </div>
               <div className="flex gap-[10px]">
                  {isLoggedIn ? (
                     <Link
                        href="#"
                        className="rounded border border-[#FF6B00] px-[26px] py-[5px] font-poppins text-[20px] font-medium uppercase text-white transition hover:bg-[#FF6B00]"
                     >
                        Connect
                     </Link>
                  ) : (
                     <>
                        <SheetClose asChild>
                           <Link
                              href="/signin"
                              className="secondary-button w-[100px] rounded px-[6px] py-1 text-center font-poppins text-[20px] font-medium text-white"
                           >
                              Sign In
                           </Link>
                        </SheetClose>
                        <SheetClose asChild>
                           <Link
                              href="/signup"
                              className="primary-button w-[100px] rounded px-[6px] py-1 text-center font-poppins text-[20px] font-medium"
                           >
                              Join Us
                           </Link>
                        </SheetClose>
                     </>
                  )}
               </div>
            </SheetContent>
         </Sheet>
      </nav>
   );
}
