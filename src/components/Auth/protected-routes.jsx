"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isLoggedIn } from "@/lib/auth";
import { useStore } from "@/store";

const ProtectedRoutes = ({ children }) => {
   const router = useRouter();

   useEffect(() => {
      if (!isLoggedIn()) {
         router.push("/signin");
      }
   }, [router]);

   return isLoggedIn() ? children : null;
};

export default ProtectedRoutes;
