"use client";
import { landingPageNavLinks } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { usePathname } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import UserAvatar from "@/components/header/user-avatar";

export default function Navbar() {
   const pathname = usePathname();

   return (
      <div className="sticky top-0 z-20 flex h-[90px] w-full items-center justify-between bg-primary-landing px-5 py-3 text-white shadow-md lg:h-[130px] lg:px-[43px] lg:py-[17px]">
         <Link href="/" passHref>
            <div className="inline-block">
               <Image
                  src="/assets/landing/images/logo.png"
                  alt="logo"
                  width={200}
                  height={200}
                  priority
                  className="w-[90px] object-cover lg:h-[112px] lg:w-[155px]"
               />
            </div>
         </Link>

         <div className="nav-labels hidden lg:block">
            <ul className="flex space-x-[30px] font-poppins text-[20px] font-[300]">
               {landingPageNavLinks.map((item, index) => (
                  <li key={index}>
                     <Link
                        href={item.link}
                        className={pathname === item.link ? "font-[600]" : ""}
                     >
                        {item.label}
                     </Link>
                     {item.subMenu && (
                        <ul>
                           {item.subMenu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                 <a href={subItem.link}>{subItem.label}</a>
                              </li>
                           ))}
                        </ul>
                     )}
                  </li>
               ))}
            </ul>
         </div>
         <div className="hidden gap-[10px] lg:flex">
            {isLoggedIn() ? (
               // <Link
               //    href="#"
               //    className="rounded border border-[#FF6B00] px-[26px] py-[5px] font-poppins text-[20px] font-medium uppercase text-white transition hover:bg-[#FF6B00]"
               // >
               //    Connect
               // </Link>
               <>
                  <ConnectButton
                     chainStatus={"icon"}
                     accountStatus={"avatar"}
                  />
                  <UserAvatar isDashboard={false} />
               </>
            ) : (
               <>
                  <Link
                     href="/signin"
                     className="secondary-button w-[100px] rounded px-[6px] py-1 text-center font-poppins text-[20px] font-medium"
                  >
                     Sign In
                  </Link>
                  <Link
                     href="/signup"
                     className="primary-button w-[100px] rounded px-[6px] py-1 text-center font-poppins text-[20px] font-medium"
                  >
                     Join Us
                  </Link>
               </>
            )}
         </div>

         <MobileNav />
      </div>
   );
}
