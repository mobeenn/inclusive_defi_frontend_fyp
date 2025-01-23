import NavContent from "./nav-content";

export default function Sidenav() {
   return (
      <nav className="w-[17.5rem] h-svh pt-12 px-[1.375rem] fixed top-5 left-3 bg-accent-dark rounded-2xl z-50 shrink-0 hidden xl:block chat-sidebar-scroll">
         <NavContent />
      </nav>
   );
}
