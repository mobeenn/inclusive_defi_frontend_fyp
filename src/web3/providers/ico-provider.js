"use client";
import Web3 from "web3";
import icoABI from "@/web3/ABIs/ico";
import { useWalletClient } from "wagmi";
import { icoAddress, stakingAddress } from "@/web3/contract-addresses";
import { useContext, createContext, useState, useEffect } from "react";

// Creating a new context
const IcoContext = createContext();

export default function IcoProvider({ children }) {
   const { data: walletClient } = useWalletClient();
   const [methods, setMethods] = useState(null);
   const [address, setAddress] = useState("");
   const [web3, setWeb3] = useState(null);

   useEffect(() => {
      if (walletClient) {
         const web3 = new Web3(walletClient);
         setWeb3(web3);

         const userAddress = walletClient.account.address;
         setAddress(userAddress);

         // Contract Instance
         const icoInstance = new web3.eth.Contract(icoABI, icoAddress, {
            from: userAddress,
            gasPrice: web3.utils.toWei("5", "gwei"),
            gas: 300000,
         });

         setMethods(icoInstance.methods);
      } else {
         console.log("Wallet not connected. Please connect your wallet.");
      }
   }, [walletClient]);

   // Read Balance
   async function readBalance(userAddress) {
      if (!address) {
         throw new Error("Please connect your wallet");
      }
      if (!userAddress || typeof userAddress !== "string") {
         throw new Error("Invalid parameters type");
      }
      try {
         const res = await methods.balanceOf(userAddress).call();
         return Math.floor(+web3.utils.fromWei(res, "ether"));
      } catch (error) {
         console.log(error);
      }
   }

   // Read Buy Price
   async function readBuyPrice() {
      if (!address) {
         throw new Error("Please connect your wallet");
      }
      try {
         const res = await methods.buy_price().call();
         return web3.utils.fromWei(res, "ether");
      } catch (error) {
         console.log(error);
      }
   }

   // Read Buy Price in Wei
   async function readBuyPriceInWei() {
      if (!address) {
         throw new Error("Please connect your wallet");
      }
      try {
         const res = await methods.buy_price().call();
         return Number(res);
      } catch (error) {
         console.log(error);
      }
   }

   // Buy Token
   async function buyToken(amount) {
      if (!amount) {
         throw new Error("Missing parameters");
      }
      if (typeof amount !== "string") {
         throw new Error("Invalid parameters type");
      }
      try {
         const res = await methods.buyToken().send({
            value: web3.utils.toWei(amount, "ether"),
         });
         return res;
      } catch (error) {
         throw new Error(error);
      }
   }

   // Increase Allowance
   async function increaseAllowance(amount) {
      if (!amount) {
         throw new Error("Missing parameters");
      }
      if (typeof amount !== "string") {
         throw new Error("Invalid parameters type");
      }
      try {
         const res = await methods
            .increaseAllowance(
               stakingAddress,
               web3.utils.toWei(amount, "ether"),
            )
            .send();
         return res;
      } catch (error) {
         throw new Error(error);
      }
   }

   // Read Owner
   async function readOwner() {
      if (!address) {
         throw new Error("Please connect your wallet");
      }
      try {
         const res = await methods.owner().call();
         return res;
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <IcoContext.Provider
         value={{
            readBalance,
            readBuyPrice,
            readBuyPriceInWei,
            buyToken,
            increaseAllowance,
            readOwner,
         }}
      >
         {children}
      </IcoContext.Provider>
   );
}

// Custom hook to access the context
export function useIco() {
   const context = useContext(IcoContext);
   if (!context) {
      throw new Error("useIco must be used within a IcoProvider");
   }
   return context;
}
