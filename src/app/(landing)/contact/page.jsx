import ContactForm from "@/components/Auth/contact-form";
import Image from "next/image";

export default function Contact() {
   return (
      <div className="flex h-full w-full">
         <div className="flex w-full items-center justify-center bg-white pb-[130px] pt-[120px] lg:basis-[60%]">
            <div className="w-full max-w-[400px] px-3">
               <div className="flex w-full flex-col items-center justify-center font-poppins">
                  <h1 className="text-primary-landing text-[30px] font-bold uppercase">
                     Contact us
                  </h1>
                  <span className="pb-[15px] text-center text-[15px] font-normal text-[black]/30">
                     We would love to hear from you
                  </span>
                  <div className="bg-sky h-[1px] w-[160px]"></div>
               </div>
               <ContactForm />
            </div>
         </div>
         <div className="relative hidden w-full basis-[40%] items-center justify-center overflow-hidden lg:flex">
            <Image
               src={"/assets/landing/images/logo.png"}
               width={300}
               height={300}
               className="z-[5] max-w-[300px]"
               alt="logo"
            />
            <div className="absolute right-[0%] top-[50px] z-[1] rotate-[-45deg] lg:w-[1000px] 2xl:right-[20%]">
               <Image
                  src={"/assets/landing/images/home/bg-wave.png"}
                  className="w-full object-cover"
                  alt="bg"
                  width={1000}
                  height={1000}
               />
            </div>
            <div className="absolute bottom-[50px] left-[0%] z-[1] rotate-[-225deg] lg:w-[1000px] 2xl:left-[20%]">
               <Image
                  src={"/assets/landing/images/home/bg-wave.png"}
                  className="w-full object-cover"
                  alt="bg"
                  width={1000}
                  height={1000}
               />
            </div>
         </div>
      </div>
   );
}
