import Image from "next/image";

export default function NotificationItem({
   title,
   projectName,
   time,
   amount = null,
   investorName = null,
}) {
   let icon, content;

   // if (title === "Project Approved") {
   //    icon = "/assets/icons/project-approved.svg";
   //    content = (
   //       <p className="text-[#7D7CAF] text-[11px] mt-1 mb-0.5">
   //          Your project <White>{`"${projectName}"`}</White> has been approved.
   //       </p>
   //    );
   // } else if (title === "Project Rejected") {
   //    icon = "/assets/icons/project-rejected.svg";
   //    content = (
   //       <p className="text-[#7D7CAF] text-[11px] mt-1 mb-0.5">
   //          Your project <White>{`"${projectName}"`}</White> has been rejected.
   //       </p>
   //    );
   // } else if (title === "Funds Received") {
      icon = "/assets/icons/funds-received.svg";
      content = (
         <p className="text-[#7D7CAF] text-[11px] mt-1 mb-0.5">
            {/* You received <White>${amount}</White> for{" "} */}
            <White>{`${projectName}`}</White>
             {/* by{" "} */}
            {/* <White>{`"${investorName}"`}</White> */}
         </p>
      );
   // }

   return (
      <div className="bg-notification-item hover:bg-[#1A173E] h-[80px] transition-all py-3 px-6 cursor-pointer flex items-start gap-3">
         <Image src={icon} alt="notification" width={35} height={35} />
         <div>
            <h3 className="text-[13px] font-bold">{title}</h3>
            {content}
            <p className="text-[10px] text-[#59588D]">{time}</p>
         </div>
      </div>
   );
}

function White({ children }) {
   return <span className="text-white">{children}</span>;
}
