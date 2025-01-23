import Image from "next/image";

export default function TermsOfUse() {
   return (
      <>
         <div className="font-roboto relative min-h-[200px] overflow-hidden px-4 pt-12 sm:min-h-[250px]">
            <div className="relative z-[5] mx-auto max-w-[1200px]">
               <h1 className="text-[36px] font-semibold text-white sm:text-[50px]">
                  TERMS OF USE
               </h1>
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
         <div className="flex w-full justify-center bg-white">
            <div className="roboto-light mb-[21px] mt-[52px] h-full w-[1034px] border-[1px] border-black border-opacity-[10%] px-5 pb-[29px] pt-[23px] text-[16px] sm:px-[39px] sm:text-[20px]">
               <p>
                  Welcome to Inclusive DeFi LLC! By accessing or using our
                  website and services, you agree to comply with and be bound by
                  the following Terms of Use. Please read these terms carefully
                  before using our platform.
               </p>
               <p className="my-[20px] font-bold">1. Acceptance of Terms:</p>
               <p>
                  By accessing or using our website and services, you agree to
                  comply with these Terms of Use and any additional terms and
                  conditions that may apply to specific services or features
                  offered by Inclusive DeFi LLC
               </p>
               <p className="my-[20px] font-bold">2. User Eligibility:</p>
               <p>
                  You must be at least 18 years old and have the legal capacity
                  to enter into contracts to use our services. By using our
                  platform, you represent and warrant that you meet these
                  eligibility requirements.
               </p>
               <p className="my-[20px] font-bold">3. User Account:</p>
               <p>
                  To access certain features of our platform, you may need to
                  create a user account. You are responsible for maintaining the
                  confidentiality of your account credentials and for any
                  activities that occur under your account.
               </p>
               <p className="my-[20px] font-bold">4. Intellectual Property:</p>
               <p>
                  All content, materials, and trademarks on our website are
                  owned or licensed by Inclusive DeFi LLC and are protected by
                  copyright and other intellectual property laws. You may not
                  use, copy, or distribute any content from our platform without
                  our prior written consent.
               </p>
               <p className="my-[20px] font-bold">5. Prohibited Conduct:</p>
               <p>
                  You agree not to engage in any prohibited conduct while using
                  our platform, including but not limited to:
               </p>
               <ul className="ml-[20px] list-disc">
                  <li>Violating any laws or regulations</li>
                  <li>Interfering with the operation of our platform</li>
                  <li>Impersonating another person or entity</li>
                  <li>Transmitting spam, viruses, or other harmful content</li>
               </ul>
               <p className="my-[20px] font-bold">
                  6. Disclaimer of Warranties:
               </p>
               <p>
                  Our platform is provided on an &quot;as is&quot; and &quot;as
                  available&quot; basis, without any warranties of any kind,
                  express or implied. We do not guarantee the accuracy,
                  completeness, or reliability of any content or information on
                  our website.
               </p>
               <p className="my-[20px] font-bold">
                  7. Limitation of Liability:
               </p>
               <p>
                  In no event shall Inclusive DeFi LLC be liable for any
                  indirect, incidental, special, or consequential damages
                  arising out of or in any way connected with your use of our
                  platform, even if we have been advised of the possibility of
                  such damages.
               </p>
               <p className="my-[20px] font-bold">8. Governing Law:</p>
               <p>
                  These Terms of Use shall be governed by and construed in
                  accordance with the laws of United States of America (USA).
                  Any disputes arising under these terms shall be subject to the
                  exclusive jurisdiction of the courts in USA.
               </p>
               <p className="my-[20px] font-bold">9. Changes to Terms:</p>
               <p>
                  We reserve the right to update or modify these Terms of Use at
                  any time without prior notice. By continuing to use our
                  platform after any changes, you agree to be bound by the
                  revised terms.
               </p>
               <p className="my-[20px] font-bold">Contact Us:</p>
               If you have any questions or concerns about our Terms of Use or
               the operation of our platform, please contact us at
               support@inclusivedefi.com.
            </div>
         </div>
      </>
   );
}
