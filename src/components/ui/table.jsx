const { cn } = require("@/lib/utils");

function Table({ className, children }) {
   return <table className={cn("w-full", className)}>{children}</table>;
}

function Head({ className, children }) {
   return (
      <thead
         className={cn("text-[12px] font-semibold text-[#A0AEC0]", className)}
      >
         {children}
      </thead>
   );
}

function Body({ className, children }) {
   return (
      <tbody
         className={cn(
            "text-center text-sm font-semibold text-primary",
            className,
         )}
      >
         {children}
      </tbody>
   );
}

function HeadRow({ className, children }) {
   return <tr className={className}>{children}</tr>;
}

function Row({ className, children }) {
   return (
      <tr className={cn("border-t border-[#E2E8F0]", className)}>{children}</tr>
   );
}

function Data({ className, children, ...props }) {
   return (
      <td className={cn("whitespace-nowrap px-2 py-3", className)} {...props}>
         {children}
      </td>
   );
}

function HeadData({ className, children }) {
   return <th className={cn("px-2 pb-3", className)}>{children}</th>;
}

function Status({ className, status, children }) {
   return (
      <span
         className={cn(
            "rounded px-2.5 py-1 font-[500] text-white",
            {
               "bg-[#48BB78]": status === "active" || status === "green",
               "bg-[#CBD5E0]": status === "completed",
               "bg-[#F2994A]": status === "pending" || status === "yellow",
               "bg-[#FA1C1C]": status === "red",
            },
            className,
         )}
      >
         {children}
      </span>
   );
}

export { Table, Head, Body, HeadRow, Row, Data, HeadData, Status };
