"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FaChevronDown } from "react-icons/fa6";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
   <AccordionPrimitive.Item
      ref={ref}
      className={cn("mb-3 border-b sm:mb-6", className)}
      {...props}
   />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
   ({ className, children, ...props }, ref) => (
      <AccordionPrimitive.Header className="flex">
         <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
               "border-primary-landing data-[state=open]:bg-primary-landing font-roboto flex min-h-[90px] flex-1 items-center justify-between rounded-[2px] border px-3 py-4 text-[16px] font-semibold transition-all data-[state=open]:text-white sm:min-h-[110px] sm:px-9 sm:text-[20px] [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:stroke-white",
               className,
            )}
            {...props}
         >
            {children}
            <FaChevronDown className="shrink-0 transition-transform duration-200" />
         </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
   ),
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
   ({ className, children, ...props }, ref) => (
      <AccordionPrimitive.Content
         ref={ref}
         className="font-roboto overflow-hidden border px-4 text-[14px] font-[300] transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down sm:text-[20px]"
         {...props}
      >
         <div className={cn("py-4", className)}>{children}</div>
      </AccordionPrimitive.Content>
   ),
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
