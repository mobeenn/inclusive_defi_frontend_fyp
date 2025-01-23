"use client";
import Web3 from "web3";
import stakingABI from "@/web3/ABIs/staking";
import { useWalletClient } from "wagmi";
import { stakingAddress } from "@/web3/contract-addresses";
import { useContext, createContext, useState, useEffect } from "react";

// Creating a new context
const StakingContext = createContext();

export default function StakingProvider({ children }) {
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
         const stakingInstance = new web3.eth.Contract(
            stakingABI,
            stakingAddress,
            {
               from: userAddress,
               gasPrice: web3.utils.toWei("5", "gwei"),
               gas: 300000,
            },
         );

         setMethods(stakingInstance.methods);
      } else {
         console.log("Wallet not connected. Please connect your wallet.");
      }
   }, [walletClient]);

   // Read User Staking Details
   async function readUserStakingDetails() {
      if (!address) {
         throw new Error("Please connect your wallet!");
      }
      try {
         const res = await methods.StakingUserDetail(address).call();
         return {
            amountStaked: +web3.utils.fromWei(res?.amountStaked, "ether"),
            totalEarning: +web3.utils.fromWei(res?.totalEarning, "ether"),
            unClaimedRewards: +web3.utils.fromWei(
               res?.unClaimedRewards,
               "ether",
            ),
            timeOfLastUpdate: res?.timeOfLastUpdate,
            startTime: res?.startTime,
            stakingPlan: res?.stakingPlan,
            status: res?.status,
         };
      } catch (error) {
         console.log(error);
      }
   }

   // Stake Token
   async function stakeToken(amount, stakingPlan) {
      if (!address) {
         throw new Error("Please connect your wallet!");
      }
      if (typeof amount !== "number" || typeof stakingPlan !== "number") {
         throw new Error("Invalid parameters type");
      }
      try {
         const weiAmount = web3.utils.toWei(amount.toString(), "ether");
         const res = await methods.stackToken(weiAmount, stakingPlan).send();
         return res;
      } catch (error) {
         throw new Error(error);
      }
   }

   // Unstake Token
   async function unstakeToken() {
      if (!address) {
         throw new Error("Please connect your wallet!");
      }
      try {
         const res = await methods.unStakeToken().send();
         return res;
      } catch (error) {
         throw new Error(error);
      }
   }

   // Read Reward Percentage
   async function readRewardPercentage(packageId) {
      if (!packageId) {
         throw new Error("Missing parameters");
      }
      if (typeof packageId !== "number") {
         throw new Error("Invalid parameters type");
      }
      try {
         const res = await methods.rewardPercentage(packageId).call();
         return Number(res);
      } catch (error) {
         console.log(error);
      }
   }

   // Read Penalty Percentage
   async function readPenaltyPercentage() {
      if (!address) {
         throw new Error("Please connect your wallet!");
      }
      try {
         const res = await methods.panelityPercentage().call();
         return Number(res);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <StakingContext.Provider
         value={{
            readUserStakingDetails,
            stakeToken,
            unstakeToken,
            readRewardPercentage,
            readPenaltyPercentage,
         }}
      >
         {children}
      </StakingContext.Provider>
   );
}

// Custom hook to access the context
export function useStaking() {
   const context = useContext(StakingContext);
   if (!context) {
      throw new Error("useStaking must be used within a StakingProvider");
   }
   return context;
}
