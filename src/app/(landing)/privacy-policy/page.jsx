import Image from "next/image";

export default function PrivacyPolicy() {
   return (
      <>
         <div className="font-roboto relative min-h-[200px] overflow-hidden px-4 pt-12 sm:min-h-[250px]">
            <div className="relative z-[5] mx-auto max-w-[1200px]">
               <h1 className="text-[36px] font-semibold text-white sm:text-[50px]">
                  PRIVACY POLICY
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
                  At Inclusive DeFi LLC, we are committed to protecting your
                  privacy and ensuring the security of your personal
                  information. This Privacy Policy outlines how we collect, use,
                  disclose, and protect the information we collect from users of
                  our website and services.
               </p>

               <p className="my-[20px] font-bold">Information We Collect:</p>

               <ul className="ml-[20px] list-disc space-y-6">
                  <li>
                     Personal Information: When you use our website or services,
                     we may collect personal information such as your name,
                     email address, contact information, and other details
                     necessary to provide our services.
                  </li>
                  <li>
                     Usage Information: We may collect information about how you
                     interact with our website, including your IP address,
                     browser type, device information, and pages visited
                  </li>
                  <li>
                     Cookies: We may use cookies and similar tracking
                     technologies to enhance your browsing experience, analyze
                     website traffic, and personalize content and
                     advertisements.
                  </li>
               </ul>

               <p className="my-[20px] font-bold">
                  How We Use Your Information:
               </p>

               <ul className="ml-[20px] list-disc space-y-6">
                  <li>
                     To Provide Services: We use the information we collect to
                     provide, maintain, and improve our services, including
                     processing transactions, communicating with users, and
                     customizing user experiences.
                  </li>
                  <li>
                     To Protect Rights: We may use your information to enforce
                     our Terms of Use, protect our rights and property, and
                     comply with legal obligations.
                  </li>
                  <li>
                     For Marketing Purposes: With your consent, we may use your
                     information to send promotional materials, newsletters, and
                     updates about our services and offerings.
                  </li>
               </ul>
               <p className="my-[20px] font-bold">Data Security:</p>
               <p>
                  We implement industry-standard security measures to protect
                  your personal information from unauthorized access,
                  disclosure, alteration, or destruction. However, no method of
                  transmission over the Internet or electronic storage is 100%
                  secure, and we cannot guarantee absolute security.
               </p>
               <p className="my-[20px] font-bold">Third-Party Links:</p>
               <p>
                  Our website may contain links to third-party websites or
                  services that are not owned or controlled by Inclusive DeFi
                  LLC. We are not responsible for the privacy practices or
                  content of these third-party sites and encourage you to review
                  their privacy policies before providing any personal
                  information.
               </p>
               <p className="my-[20px] font-bold">Updates to Privacy Policy:</p>
               <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or legal requirements. We will notify
                  you of any material changes by posting the updated policy on
                  our website or through other communication channels.
               </p>
               <p className="my-[20px] font-bold">Contact Us:</p>
               <p>
                  If you have any questions or concerns about our Privacy Policy
                  or the handling of your personal information, please contact
                  us at support@inclusivedefi.com.
               </p>
            </div>
         </div>
      </>
   );
}
