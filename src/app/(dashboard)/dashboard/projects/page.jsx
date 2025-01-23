"use client";
import CreatorView from "@/components/Projects/creator-view";
import PageLoader from "@/components/ui/page-loader";
import { isUserVerified } from "@/lib/auth";
import { useStore } from "@/store";
import { notFound, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Projects() {
   const user = useStore((state) => state.user);
   const router = useRouter();

   if (!user) {
      return <PageLoader />;
   } else if (!isUserVerified(user)) {
      toast.error(
         "Your account is currently unverified. Please check your email for the verification link and complete the verification process to proceed with using our services. Thank you.",
      );
      router.push("/dashboard");
   } else if (user?.role === "creator") {
      return <CreatorView />;
   } else if (user?.role === "investor") {
      return notFound();
   }
}
