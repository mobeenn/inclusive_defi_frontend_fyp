"use client";

import { BsTwitterX } from "react-icons/bs";
import sections from "./footer-content";
import { FiPhone, FiMail, FiFacebook, FiInstagram } from "react-icons/fi";

export default function Footer() {
   return (
      <footer>
         <div className="mx-auto w-[90%] max-w-[1300px] font-poppins text-white">
            <div className="flex w-full items-start justify-center py-8">
               <div className="grid w-full grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                  {sections.map((section, index) => (
                     <div key={index} className="text-center md:text-left">
                        <h6
                           className={`mb-4 flex justify-center font-semibold uppercase md:justify-start ${
                              index === 0 ? "text-[32px]" : "text-[24px]"
                           }`}
                        >
                           {section.title}
                        </h6>
                        {section.content && (
                           <>
                              <p className="mx-auto w-[221px] font-poppins text-[14px] font-light leading-8 md:mx-0">
                                 {section.content}
                              </p>
                              {index === 0 && (
                                 <div className="mt-[5px] flex justify-center gap-[13px] md:justify-start">
                                    {section.socialIcons.map(
                                       (socialIcon, i) => (
                                          <a
                                             key={i}
                                             href={socialIcon.url}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="text-accent-landing mx-2 rounded-full bg-white p-2 text-[25px]"
                                          >
                                             {socialIcon.icon ===
                                                "facebook" && <FiFacebook />}
                                             {socialIcon.icon === "twitter" && (
                                                <BsTwitterX />
                                             )}
                                             {socialIcon.icon ===
                                                "instagram" && <FiInstagram />}
                                          </a>
                                       ),
                                    )}
                                 </div>
                              )}
                           </>
                        )}
                        {section.links && (
                           <div>
                              {section.links.map((link, i) => (
                                 <p key={i} className="mb-4 font-[300]">
                                    <a href={link.href}>{link.text}</a>
                                 </p>
                              ))}
                           </div>
                        )}
                        {section.contactInfo && (
                           <div>
                              {section.contactInfo.map((info, i) => (
                                 <a
                                    key={i}
                                    href={
                                       info.icon === "phone"
                                          ? `tel:${info.text}`
                                          : `mailto:${info.text}`
                                    }
                                    className="mb-4 flex cursor-pointer items-center justify-center text-[14px] font-[300] md:justify-start"
                                 >
                                    <p className="me-3 h-5 w-5 cursor-pointer text-[16px]">
                                       {info.icon === "phone" && (
                                          <FiPhone color="white" />
                                       )}{" "}
                                       {info.icon === "email" && <FiMail />}{" "}
                                    </p>
                                    {info.text}
                                 </a>
                              ))}
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <hr className="h-[3px] bg-white text-white" />
         <div className="py-[19px] pb-[18px] text-center font-poppins text-[12px] font-semibold tracking-wide text-white">
            <h2>Copyright © 2024 Inclusive DeFi. All rights reserved</h2>
         </div>
      </footer>
   );
}
