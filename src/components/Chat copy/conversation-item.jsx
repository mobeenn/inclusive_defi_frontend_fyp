import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import Image from "next/image";
import moment from "moment";

export default function ConversationItem({ id, name, avatar, date, ...props }) {
   const currentTicket = useStore((state) => state.currentTicket);
   const isActive = currentTicket?._id === id;

   const src = avatar && avatar !== "null" ? avatar : "/assets/images/user-temp.png";

   return (
      <div
         className={cn(
            "relative bg-[#F8F9FA] text-[#718096] h-[60px] flex flex-col justify-center gap-1 px-[18px] cursor-pointer",
            isActive && "bg-[#CBE4FD] text-[#303132]"
         )}
         {...props}
      >
         <div className="flex items-center gap-1.5">
            <Image src={src} alt={"user"} width={30} height={30} className="object-cover rounded-full aspect-square" />
            <h3>{name}</h3>
         </div>
         <p className="text-[#D8A353] text-[10px] absolute bottom-3 right-3">{moment(date).format("MMMM Do YYYY")}</p>
      </div>
   );
}
