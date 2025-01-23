"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isLoggedIn } from "@/lib/auth";

const RedirectFromLogin = ({ children }) => {
   const router = useRouter();
   const loggedIn = isLoggedIn();

   useEffect(() => {
      if (loggedIn) {
         router.push("/");
      }
   }, [router, loggedIn]);

   return loggedIn ? null : children;
};

export default RedirectFromLogin;
