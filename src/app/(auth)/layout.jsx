import Image from "next/image";
import Link from "next/link";
import RedirectFromLogin from "../../components/Auth/redirect-from-login";

export default function AuthLayout({ children }) {
   return (
      <div className="min-h-svh bg-accent">
         {/* <RedirectFromLogin> */}
         <main className="flex min-h-svh items-center justify-center overflow-hidden bg-accent p-3 sm:px-6 xl:pt-5">
            <div className="relative z-50 flex w-full max-w-[670px] flex-col items-center justify-center gap-[12px] p-5">
               <Link href="/">
                  <Image
                     src="/assets/images/logo-white.png"
                     alt="logo"
                     width={300}
                     height={300}
                     className="w-[240px]"
                  />
               </Link>
               {children}
               <div className="absolute top-[-20px] z-[-1] aspect-square h-[120%] w-auto rounded-full bg-[#000033]" />
            </div>
         </main>
         {/* </RedirectFromLogin> */}
      </div>
   );
}
