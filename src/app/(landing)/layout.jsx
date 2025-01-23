import Navbar from "@/components/landing-page/navbar";
import Footer from "@/components/landing-page/footer";

export default function LandingPageLayout({ children }) {
   return (
      <div className="flex h-full w-full flex-col justify-between gap-2 bg-primary-landing">
         <Navbar />
         <main className="h-full w-full">{children}</main>
         <Footer />
      </div>
   );
}
