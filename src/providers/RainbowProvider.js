"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmiConfig";
import QueryProvider from "./QueryProvider";
import { useStore } from "@/store";
import { useEffect } from "react";

export default function RainbowProvider({ children, initialState }) {
   const fetchCurrentUser = useStore((state) => state.fetchCurrentUser);

   useEffect(() => {
      fetchCurrentUser();
   }, [fetchCurrentUser]);

   return (
      <WagmiProvider config={config} initialState={initialState}>
         <QueryProvider>
            <RainbowKitProvider
               theme={lightTheme({
                  accentColor: "#FF6B00",
                  accentColorForeground: "white",
                  borderRadius: "large",
                  fontStack: "poppins",
                  overlayBlur: "small",
               })}
            >
               {children}
            </RainbowKitProvider>
         </QueryProvider>
      </WagmiProvider>
   );
}
