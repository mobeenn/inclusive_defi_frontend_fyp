import ConversationItem from "./conversation-item";
import SearchInput from "./search-input";
import { cn } from "@/lib/utils";

export default function ChatSidebar({ handleChatChange, currentChat }) {
   return (
      <div
         className={cn(
            "h-full bg-white sm:max-w-[348px] w-full px-4 py-3 shadow-card rounded-2xl absolute left-0 top-0",
            currentChat && "hidden sm:block"
         )}
      >
         <SearchInput />

         <div className="h-[calc(100svh-176px)] xl:h-[calc(100svh-190px)] overflow-y-auto space-y-[10px] mt-3">
            <ConversationItem
               name="Muhammad Asim"
               avatar="/assets/images/user-temp.png"
               date="30 March 2020"
               onClick={() => handleChatChange(1)}
            />
            <ConversationItem
               name="Muhammad Asim"
               avatar="/assets/images/user-temp.png"
               date="30 March 2020"
               onClick={() => handleChatChange(1)}
            />
         </div>
      </div>
   );
}
