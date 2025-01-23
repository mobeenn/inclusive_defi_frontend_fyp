"use client";
import { useContext, createContext, useState, useEffect } from "react";
import Web3 from "web3";

import { useWalletClient } from "wagmi";

import crowdFundingABI from "@/web3/ABIs/crowd-funding";
import { crowdFundingAddress } from "@/web3/contract-addresses";

// Creating a new context
const CrowdFundingContext = createContext();

export default function CrowdFundingProvider({ children }) {
   const { data: walletClient } = useWalletClient();
   const [methods, setMethods] = useState(null);
   const [address, setAddress] = useState("");

   useEffect(() => {
      if (walletClient) {
         const web3 = new Web3(walletClient);

         const userAddress = walletClient.account.address;
         setAddress(userAddress);

         // Contract Instance
         const crowdFundingInstance = new web3.eth.Contract(
            crowdFundingABI,
            crowdFundingAddress,
            {
               from: userAddress,
               gasPrice: web3.utils.toWei("5", "gwei"),
               gas: 300000,
            },
         );

         setMethods(crowdFundingInstance.methods);
      } else {
         console.log("Wallet not connected. Please connect your wallet.");
      }
   }, [walletClient]);

   // Create Project
   async function createProject(goal, duration, projectId) {
      if (!goal || !duration || !projectId) {
         throw new Error("Missing parameters");
      }
      if (
         typeof goal !== "number" ||
         typeof duration !== "number" ||
         typeof projectId !== "string"
      ) {
         throw new Error("Invalid parameters type");
      }
      try {
         const res = await methods
            .createProject(goal * 10 ** 18, duration, projectId)
            .send();
         return res;
      } catch (error) {
         console.log(error);
      }
   }

   // Update Project
   async function updateWeb3Project(goal, duration, projectId) {
      if (!goal || !duration || !projectId) {
         throw new Error("Missing parameters");
      }
      if (
         typeof goal !== "number" ||
         typeof duration !== "number" ||
         typeof projectId !== "string"
      ) {
         throw new Error("Invalid parameters type");
      }
      try {
         const res = await methods
            .updateProject(goal * 10 ** 18, projectId, duration)
            .send();
         return res;
      } catch (error) {
         console.log(error);
      }
   }

   // Funding in Project
   async function contribute(projectId, amount) {
      if (!projectId || !amount) {
         throw new Error("Missing parameters");
      }
      if (typeof projectId !== "string" || typeof amount !== "number") {
         throw new Error("Invalid parameters type");
      }
      try {
         const res = await methods.contribute(projectId).send({
            value: (amount * 10 ** 18).toString(),
         });
         return res;
      } catch (error) {
         throw new Error(error);
      }
   }

   // Read Project
   async function readProject(projectId) {
      if (!projectId) {
         throw new Error("Missing parameters");
      }
      if (typeof projectId !== "string") {
         throw new Error("Invalid parameters type");
      }
      if (!address) {
         throw new Error("Please connect your wallet");
      }
      try {
         const res = await methods.projects(projectId).call();
         return res;
      } catch (error) {
         console.log(error);
      }
   }

   // Creator Withdraw
   async function withdraw(projectId) {
      if (!projectId) {
         throw new Error("Missing parameters");
      }
      if (typeof projectId !== "string") {
         throw new Error("Invalid parameters type");
      }
      try {
         const res = await methods.creatorWithdrawFunds(projectId).send();
         return res;
      } catch (error) {
         throw new Error(error);
      }
   }

   // Investor Refund
   async function refund(projectId) {
      if (!projectId) {
         throw new Error("Missing parameters");
      }
      if (typeof projectId !== "string") {
         throw new Error("Invalid parameters type");
      }
      try {
         const res = await methods.investorRefund(projectId).send();
         return res;
      } catch (error) {
         throw new Error(error);
      }
   }

   // Read System Fee
   async function readSystemFeeInWei() {
      if (!address) {
         throw new Error("Please connect your wallet");
      }
      try {
         const res = await methods.systemFee().call();
         return Number(res);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <CrowdFundingContext.Provider
         value={{
            createProject,
            updateWeb3Project,
            contribute,
            readProject,
            withdraw,
            refund,
            readSystemFeeInWei,
         }}
      >
         {children}
      </CrowdFundingContext.Provider>
   );
}

// Custom hook to access the context
export function useCrowdFunding() {
   const context = useContext(CrowdFundingContext);
   if (!context) {
      throw new Error(
         "useCrowdFunding must be used within a CrowdFundingProvider",
      );
   }
   return context;
}
