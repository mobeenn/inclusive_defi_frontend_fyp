import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Spinner from "./spinner";

const buttonVariants = cva(
   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80 select-none",
   {
      variants: {
         variant: {
            default:
               "bg-accent text-white hover:bg-accent-dark/85 active:bg-accent-dark font-poppins ",
            destructive: "bg-red-500 text-gray-50 hover:bg-red-500/90",
            outline:
               "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900",
            green: "border border-gray-200 bg-[#0B6A48] text-white hover:bg-gray-100 hover:text-gray-900",
            secondary:
               "!h-[28px] border-2 border-[#FF6B00] bg-transparent text-[#424242] text-[13px] !px-[1.625rem] hover:bg-[#FF6B00] active:bg-[#FF6B00]/90",
            ghost: "hover:bg-gray-100 hover:text-gray-900",
            link: "text-gray-900 underline-offset-4 hover:underline",
            custom:
               "!px-6 !h-[3rem] bg-accent-dark text-xl text-white font-medium uppercase hover:bg-accent-dark/85 active:bg-accent-dark font-poppins",
            auth: "primary-dashboard-button hover:opacity-85 active:scale-95 active:opacity-100 !h-[44px] !px-[27px] !py-[7px] rounded text-base font-poppins font-medium uppercase tracking-wide",
         },
         size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   },
);

const Button = React.forwardRef(
   (
      {
         className,
         variant,
         size,
         asChild = false,
         children,
         loading,
         ...props
      },
      ref,
   ) => {
      const Comp = asChild ? Slot : "button";
      return (
         <>
            <Comp
               className={cn(buttonVariants({ variant, size, className }))}
               ref={ref}
               disabled={loading}
               {...props}
            >
               {loading && <Spinner />}
               {children}
            </Comp>
         </>
      );
   },
);
Button.displayName = "Button";

export { Button, buttonVariants };
