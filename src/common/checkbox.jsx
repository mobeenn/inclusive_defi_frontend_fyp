import { Check } from "lucide-react";

export default function Checkbox({ ...props }) {
   return (
      <label className="relative block border border-[#E2E8F0] size-[15px] cursor-pointer">
         <input
            type="checkbox"
            className="hidden peer"
            {...props}
            // {...register("terms", { required: true })}
         />
         <span className="absolute -top-px -left-px border-2 border-[#00a3ff] size-[15px] bg-[#00a3ff] scale-0 peer-checked:scale-100 transition-all flex items-center justify-center">
            <Check className="text-white" strokeWidth="5" />
         </span>
      </label>
   );
}
