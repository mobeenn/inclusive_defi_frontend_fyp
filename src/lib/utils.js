import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
   return twMerge(clsx(inputs));
}

// Capitalize first letter of each word in a sentence
export function capitalizeFirstLetter(sentence) {
   if (!sentence) return;
   const words = sentence.split(" ");
   words.forEach((word, index) => {
      words[index] = word.charAt(0).toUpperCase() + words[index].slice(1);
   });
   return words.join(" ");

   // if (typeof word !== "string") return;
   // return word.charAt(0).toUpperCase() + word.slice(1);
}

export function truncateAddress(address) {
   if (!address) return;
   return address.slice(0, 6) + "..." + address.slice(-4);
}
