import Link from "next/link";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { faqs } from "@/lib/data";

export default function Faqs() {
   return (
      <div className="bg-primary-landing">
         <div className="font-roboto relative min-h-[200px] w-full overflow-hidden px-4 pt-5 sm:min-h-[250px]">
            <div className="relative z-[5] mx-auto max-w-[1000px]">
               <h1 className="text-[36px] font-bold text-white sm:text-[50px]">
                  FAQs
               </h1>
               <span className="text-[16px] font-[300] text-white sm:text-[20px]">
                  Let us answer your all queries
               </span>
            </div>
            <div className="absolute right-[-20%] top-[0] z-[1] hidden w-[800px] rotate-[160deg] sm:block lg:right-[-10%] lg:h-[547px] lg:w-[1188px]">
               <Image
                  src={"/assets/landing/images/home/bg-wave.png"}
                  className="w-full object-cover"
                  alt="bg"
                  width={1000}
                  height={1000}
               />
            </div>
         </div>
         <div className="flex w-full flex-col items-center bg-white px-4 pt-[30px]">
            <div className="w-full max-w-[1000px]">
               <Accordion type="single" collapsible className="w-full">
                  {faqs.map((item, index) => (
                     <AccordionItem value={`${index}`} key={index}>
                        <AccordionTrigger>{item?.question}</AccordionTrigger>
                        <AccordionContent>{item?.answer}</AccordionContent>
                     </AccordionItem>
                  ))}
               </Accordion>
            </div>

            <div className="font-roboto my-[36px] flex w-full flex-wrap items-center justify-center text-[17px]">
               <span className="text-black">
                  Need to ask something else? &nbsp;
               </span>
               <Link href="/contact" className="text-[#3159C6]">
                  Contact Us Now!
               </Link>
            </div>
            <br />
         </div>
      </div>
   );
}
