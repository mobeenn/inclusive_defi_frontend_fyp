import Sidenav from "@/components/sidenav";
import Header from "@/components/header";
import ProtectedRoutes from "@/components/Auth/protected-routes";
import ChatSocketProvider from "@/components/Chat/chat-socket-provider";

export default function DashboardLayout({ children }) {
   return (
      <ProtectedRoutes>
         <ChatSocketProvider>
            <Sidenav />
            <main className="xl:ml-[calc(17.5rem+.75rem)]">
               <div className="p-3 sm:px-6 xl:pt-5">
                  <Header />
                  {children}
               </div>
            </main>
         </ChatSocketProvider>
      </ProtectedRoutes>
   );
}
