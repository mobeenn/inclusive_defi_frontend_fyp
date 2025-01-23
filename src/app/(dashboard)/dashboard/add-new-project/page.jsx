"use client";
import NewProjectForm from "@/components/Projects/new-project-form";
import PageLoader from "@/components/ui/page-loader";
import { isUserVerified } from "@/lib/auth";
import { useStore } from "@/store";
import { notFound, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddNewProject() {
   const user = useStore((state) => state.user);
   const router = useRouter();

   if (!user) {
      return <PageLoader />;
   } else if (!isUserVerified(user)) {
      toast.error(
         "Your account is currently unverified. Please check your email for the verification link and complete the verification process to proceed with using our services. Thank you.",
      );
      router.push("/dashboard");
   } else if (user?.role === "investor") {
      notFound();
   } else if (user?.role === "creator") {
      return (
         <>
            <div className="@container">
               <div className="rounded-lg bg-white px-4 py-6 shadow-card @[1070px]:px-16 sm:rounded-2xl sm:px-9 sm:py-9">
                  <NewProjectForm />
               </div>
            </div>
         </>
      );
   }
}
