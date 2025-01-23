"use client";
import { useState } from "react";
import { TbCopy } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import { toast } from "sonner";
import copy from "copy-to-clipboard";

export default function Copy({ text }) {
   const [isCopied, setIsCopied] = useState(false);

   function handleCopy() {
      if (isCopied) return;

      copy(text);

      toast.success("Copied to clipboard!");
      setIsCopied(true);

      setTimeout(() => {
         setIsCopied(false);
      }, 2000);
   }

   return (
      <button
         className="text-base text-gray-400 transition-all hover:text-gray-500"
         onClick={handleCopy}
      >
         {isCopied ? (
            <FaCheck className="text-sm text-green-500" />
         ) : (
            <TbCopy />
         )}
      </button>
   );
}
