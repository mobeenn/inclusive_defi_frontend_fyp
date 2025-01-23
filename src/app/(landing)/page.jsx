import Link from "next/link";
import Image from "next/image";
import { partners } from "@/lib/data";
import PublicProjectSlider from "@/components/Projects/public-project-slider";

export default function Page() {
   return (
      <div className="relative h-full w-full overflow-hidden bg-primary-landing">
         {/* Hero */}
         <div className="relative z-[5] flex items-center px-4 pt-10 sm:px-10 lg:px-[100px] lg:pt-0">
            <div className="w-full">
               <h1 className="w-full text-center text-[18px] font-bold uppercase leading-[40px] text-white sm:text-[26px] sm:leading-[50px] md:text-[32px] md:leading-[60px] lg:text-[40px] lg:leading-[82px] xl:max-w-[600px] xl:text-left">
                  &rdquo;TOGETHER WE CAN EMPOWER MILLIONS OF
                  <span className="text-sky"> UNDERSERVED/UNDERMARKETED </span>
                  ENTREPRENEURS TO FULFILL
                  <span className="text-sky"> THEIR DREAMS</span>&rdquo;
               </h1>
               <div className="z-[5px] flex flex-col items-center justify-center gap-[20px] pt-12 sm:flex-row sm:pt-[80px] xl:justify-start">
                  <Link
                     href="/projects"
                     className="primary-button rounded px-[16px] py-[5px] text-center font-poppins text-[16px] font-medium md:px-[27px] md:text-[20px]"
                  >
                     Explore Projects
                  </Link>
                  <Link href="/dashboard/projects">
                     <button className="secondary-button rounded px-[16px] py-[5px] font-poppins text-[16px] font-medium text-white md:px-[27px] md:text-[20px]">
                        Launch a Project
                     </button>
                  </Link>
               </div>
            </div>
            <div className="mr-[50px] mt-[-50px] hidden xl:block">
               <Image
                  width={500}
                  height={500}
                  src="/assets/landing/images/stack.svg"
                  alt="stack"
                  className="h-[560px] w-[735px]"
               />
            </div>
         </div>
         {/* Partners */}
         <div className="partners-bg relative z-[5] mt-[100px] flex min-h-[128px] w-full items-center justify-center px-10 py-4 font-poppins">
            <div className="flex w-full max-w-[1300px] flex-col items-center gap-2 gap-y-4 xl:flex-row xl:divide-x">
               <h1 className="shrink-0 text-[24px] font-semibold uppercase text-white xl:pr-8">
                  our partners
               </h1>
               <div className="flex w-full flex-col items-center justify-between gap-2 gap-y-4 lg:flex-row xl:pl-8">
                  {partners?.map((partner, index) => (
                     <Image
                        key={index}
                        src={partner}
                        alt="partner"
                        width={180}
                        height={100}
                        className="w-36 lg:w-44"
                     />
                  ))}
               </div>
            </div>
         </div>

         {/* Projects */}
         <div className="relative z-[5] mt-[69px] flex w-full flex-col items-center justify-center gap-[83px]">
            <h1 className="px-2 text-center font-poppins text-[26px] font-semibold uppercase tracking-wider text-white sm:text-[32px] lg:text-[40px]">
               Explore mega Projects
            </h1>
            <PublicProjectSlider />

            <button className="my-[40px] w-auto border border-[#B772FF] px-4 py-3 font-poppins font-medium text-[lg] text-white sm:w-[312px] sm:py-[20px] sm:text-xl">
               Explore More Projects
            </button>

            {/* How it works */}
            <div className="mt-[38px] w-[90%] max-w-[1300px]">
               <div className="flex w-full flex-col items-center justify-between gap-10 text-white xl:gap-5 [@media(min-width:860px)]:flex-row">
                  <div className="flex w-full flex-col gap-10 xl:w-[538px] [@media(min-width:860px)]:gap-[87px]">
                     <div className="w-full">
                        <div className="mb-4 sm:mb-6">
                           <Image
                              src="/assets/landing/images/home/1.jpeg"
                              alt="icon 1"
                              width={130}
                              height={47}
                           />
                        </div>
                        <p className="font-poppins font-[600] leading-[1.875rem]">
                           At Inclusive DeFi, we&apos;re not just offering a
                           solution; we&apos;re providing a lifeline to
                           entrepreneurs whom traditional financing systems have
                           sidelined.
                        </p>
                     </div>
                     <div>
                        <div className="mb-4 sm:mb-6">
                           <Image
                              src="/assets/landing/images/home/2.jpeg"
                              alt="icon 1"
                              width={130}
                              height={47}
                           />
                        </div>
                        <p className="font-poppins font-[600] leading-[1.875rem]">
                           Our platform leverages the power of blockchain
                           technology to democratize access to capital, ensuring
                           that every visionary has the chance to turn their
                           dreams into reality.
                        </p>
                     </div>
                  </div>
                  <div className="hidden shrink-0 justify-center xl:flex">
                     <Image
                        src="/assets/landing/images/home/lock.png"
                        alt="lock"
                        width={427}
                        height={435}
                        className="w-full max-w-[427px]"
                     />
                  </div>
                  <div className="flex w-full flex-col gap-10 xl:w-[538px] [@media(min-width:860px)]:gap-[87px]">
                     <div>
                        <div className="mb-4 sm:mb-6">
                           <Image
                              src="/assets/landing/images/home/3.jpeg"
                              alt="icon 1"
                              width={130}
                              height={47}
                           />
                        </div>
                        <p className="font-poppins font-[600] leading-[1.875rem]">
                           With Inclusive DeFi, entrepreneurs from all walks of
                           life can showcase their projects, connect with a
                           diverse community of backers, and secure the funding
                           they need to thrive.
                        </p>
                     </div>
                     <div>
                        <div className="mb-4 sm:mb-6">
                           <Image
                              src="/assets/landing/images/home/4.jpeg"
                              alt="icon 1"
                              width={130}
                              height={47}
                           />
                        </div>
                        <p className="font-poppins font-[600] leading-[1.875rem]">
                           Say goodbye to barriers and hello to endless
                           possibilities. Join us as we revolutionize how
                           entrepreneurs access capital and build a more
                           inclusive future for all.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="mt-[86px] flex w-full flex-col items-center gap-[72px]">
                  <button className="blue-gradient h-[54px] w-auto rounded-[5px] px-5 font-poppins text-[20px] font-[500] text-white md:h-[73px] md:w-[281px]">
                     Launchpad
                  </button>

                  <div className="blue-gradient my-[55px] w-full items-center justify-between gap-[10px] rounded-[22px] p-6 sm:rounded-[30px] md:px-[80px] md:py-10 xl:flex xl:gap-[70px] xl:py-2">
                     <div className="mx-auto max-w-[700px] basis-[60%] text-white">
                        <div className="text-center font-poppins">
                           <h2 className="text-[22px] font-semibold capitalize sm:text-[32px] sm:leading-[50px] xl:text-left">
                              Latest Updates, Upcoming Projects, Expert&apos;s
                              Ideas and much more
                           </h2>
                           <div className="xl:w-[80%]">
                              <p className="mt-1 text-balance text-sm font-semibold leading-6 sm:text-[16px]">
                                 Join our telegram community now to be a pert of
                                 informative discussions and updates.
                              </p>
                              <a
                                 href="#"
                                 className="mt-8 inline-flex h-[44px] items-center justify-center rounded-[5px] bg-white px-3 text-[16px] text-sky sm:h-[54px] sm:px-5 sm:text-xl"
                              >
                                 Join Telegram Community
                              </a>
                           </div>
                        </div>
                     </div>
                     <div className="hidden basis-[30%] xl:block">
                        <Image
                           src="/assets/landing/images/network.png"
                           className="w-full"
                           alt="network"
                           width={360}
                           height={360}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="absolute left-1/2 top-[550px] z-[1] h-[995px] w-[3025.29px] -translate-x-1/2 -translate-y-1/2 rotate-[163deg] transform mix-blend-soft-light">
            <Image
               src={"/assets/landing/images/home/bg-wave.png"}
               className="h-[997px] w-full"
               alt="bg"
               width={1000}
               height={1000}
            />
         </div>
      </div>
   );
}
