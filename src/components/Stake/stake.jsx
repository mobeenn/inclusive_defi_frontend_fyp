"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useGetBalance } from "@/data/ico";
import { useGetUserStakingDetails } from "@/data/staking";
import moment from "moment";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useStaking } from "@/web3/providers/staking-provider";
import { createStakingHistory } from "@/api/staking";
import { useQueryClient } from "@tanstack/react-query";
import { useIco } from "@/web3/providers/ico-provider";

const durationTabValues = ["1M", "3M", "6M", "1Y"];

export default function Stake({setCurrentTab}) {
   const { address } = useAccount();
   const { stakeToken } = useStaking();
   const { increaseAllowance } = useIco();
   const queryClient = useQueryClient();

   const [stakeValue, setStakeValue] = useState(0);
   const [stakePercentage, setStakePercentage] = useState(null);
   const [durationValue, setDurationValue] = useState(0);
   const [durationTabValue, setDurationTabValue] = useState(null);
   const [stakingPlan, setStakingPlan] = useState(null);
   const [isStakeLoading, setIsStakeLoading] = useState(false);

   const { data: balance } = useGetBalance({ userAddress: address });
   const { data: userStakingDetails } = useGetUserStakingDetails();

   /*
   Set Duration value according to selected Duration tab
   */
   useEffect(() => {
      if (durationTabValue === "1M") {
         setDurationValue(1);
         setStakingPlan(1);
      } else if (durationTabValue === "3M") {
         setDurationValue(3);
         setStakingPlan(2);
      } else if (durationTabValue === "6M") {
         setDurationValue(6);
         setStakingPlan(3);
      } else if (durationTabValue === "1Y") {
         setDurationValue(12);
         setStakingPlan(4);
      }
   }, [durationTabValue]);

   /*
   Handle Staking
   */
   async function handleStake() {
      if (!address) {
         toast.error("Please connect your wallet");
         return;
      }
      if (userStakingDetails?.amountStaked) {
         toast.error("You have already stacked");
         return;
      }
      if (!stakeValue || stakeValue > 50000 || stakeValue < 100) {
         toast.error("Stake amount should be between 100 and 50000");
         return;
      }
      if (stakeValue > balance) {
         toast.error("Insufficient balance");
         return;
      }
      if (!stakingPlan) {
         toast.error("Please select a package");
         return;
      }
      try {
         setIsStakeLoading(true);

         const approveRes = await increaseAllowance(stakeValue.toString());
         if (!approveRes?.transactionHash) {
            toast.error("Something went wrong");
            return;
         }

         const contractRes = await stakeToken(+stakeValue, stakingPlan);
         if (!contractRes?.transactionHash) {
            toast.error("Something went wrong");
            return;
         }

         /*
         Creating staking history
         */
         await createStakingHistory({
            Hash: contractRes?.transactionHash,
            staked_amount: stakeValue,
            reward_amount: "0",
            wallet_address: address,
            package: stakingPlan.toString(),
            status: "active",
            staking_start_time: moment().toISOString(),
            staking_end_time: moment()
               .add(durationValue, "months")
               .toISOString(),
         });

         queryClient.invalidateQueries("ico-balance");

         toast.success("Staking successful");
         setCurrentTab("history"); // Move to StakeHistory tab

      } catch (error) {
         toast.error("Something went wrong");
         console.log(error);
      } finally {
         setIsStakeLoading(false);
      }
   }

   /*
   Calculate End Date
   */
   const calculateEndDate = () => {
      if (!durationValue) return;
      let startDate = moment();
      let calculatedEndDate = startDate.add(durationValue, "months");
      return calculatedEndDate.format("DD MMM, YYYY");
   };

   function handleStakeAmountChange(e) {
      if (e.target.value > 100 || e.target.value < 0) return;
      setStakePercentage(e.target.value);
   }

   function calculateStakeAmount() {
      if (!stakePercentage) return;
      const stakeAmount = (balance / 100) * stakePercentage;
      setStakeValue(stakeAmount);
   }

   return (
      <div className="mx-auto mt-8 max-w-5xl">
         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Stake  */}
            <section>
               <p className="mb-2 px-0.5 font-poppins text-accent sm:mb-3">
                  Add Stack
               </p>
               <div className="relative flex h-[4.625rem] w-full items-center gap-3 rounded-[5px] border border-[#E2E8F0] px-3 font-poppins sm:h-[5.625rem] sm:gap-4 sm:px-5">
                  <Image
                     src="/assets/icons/eth-icon.svg"
                     alt="eth-icon"
                     width={55}
                     height={55}
                     className="aspect-square h-[45px] sm:h-[55px]"
                  />
                  <div className="flex w-full items-center justify-between text-[#404041]">
                     <input
                        type="number"
                        className="max-w-[9.375rem] bg-transparent font-poppins text-[#404041] outline-none"
                        value={stakeValue}
                        onChange={(e) => {
                           setStakeValue(e.target.value);
                        }}
                     />
                     <p className="font-poppins text-[.9375rem] font-medium sm:text-lg">
                        INCD
                     </p>
                     <p className="absolute bottom-2 right-3 text-[.9375rem] font-medium text-accent">
                        balance: {balance}
                     </p>
                  </div>
               </div>
               {/* Tabs */}
               <div className="mt-3 flex items-center gap-3">
                  <input
                     type="number"
                     className="h-10 w-full rounded border px-4 outline-none"
                     value={stakePercentage}
                     onChange={handleStakeAmountChange}
                     placeholder="Add percentage"
                  />

                  <Button onClick={calculateStakeAmount}>Apply</Button>
               </div>
            </section>

            {/* Duration */}
            <section>
               <p className="mb-2 px-0.5 font-poppins text-accent sm:mb-3">
                  Select Package
               </p>
               <div className="relative flex h-[4.625rem] w-full items-center gap-3 rounded-[5px] border border-[#E2E8F0] px-3 font-poppins sm:h-[5.625rem] sm:gap-5 sm:px-5">
                  <Image
                     src="/assets/icons/duration-icon.svg"
                     alt="eth-icon"
                     width={55}
                     height={55}
                     className="aspect-square h-[45px] sm:h-[55px]"
                  />
                  <div className="flex w-full items-center justify-between text-[#404041]">
                     <input
                        type="text"
                        readOnly
                        className="max-w-[9.375rem] bg-transparent font-poppins text-lg font-medium outline-none sm:text-2xl"
                        value={durationValue}
                        onChange={(e) => {
                           setDurationValue(e.target.value);
                           setDurationTabValue(null);
                        }}
                     />
                     <p className="font-poppins text-[.9375rem] font-medium sm:text-lg">
                        Months
                     </p>
                  </div>
               </div>
               {/* Tabs */}
               <div className="mt-3 flex items-center gap-1 font-poppins sm:mt-5 sm:gap-2">
                  {durationTabValues.map((value) => (
                     <Tab
                        key={value}
                        value={value}
                        currentValue={durationTabValue}
                        setValue={setDurationTabValue}
                     />
                  ))}
               </div>
            </section>
         </div>

         {/* Overview */}
         <h2 className="mb-4 mt-10 text-center font-poppins text-[25px] font-semibold tracking-wide text-accent sm:mb-8">
            Overview
         </h2>

         <div className="mb-10 space-y-3">
            <InfoRow title="Total Stack" value={`${stakeValue || 0} INCD`} />
            <InfoRow
               title="Amount Already Stacked"
               value={`${userStakingDetails?.amountStaked || 0} INCD`}
            />
            <InfoRow title="PACKAGE" value={`${durationValue || 0} months`} />
            {/* <InfoRow title="UNLOCK ON" value="18 May, 2028 - 05:00 AM" /> */}
            <InfoRow title="UNLOCK ON" value={calculateEndDate()} />
         </div>

         <div className="flex items-center justify-center">
            <Button
               variant="custom"
               className="!h-10 w-full max-w-[9.375rem] text-base uppercase sm:!h-[50px] sm:max-w-[11.25rem] sm:text-xl"
               onClick={handleStake}
               loading={isStakeLoading}
            >
               Stake
            </Button>
         </div>
      </div>
   );
}

function Tab({ value, currentValue, setValue }) {
   const isActive = value === currentValue;

   return (
      <div
         className={cn(
            "flex h-9 flex-1 cursor-pointer items-center justify-center rounded-[5px] bg-[#E2E2E2] transition-all active:scale-90",
            {
               "bg-accent": isActive,
            },
         )}
         onClick={() => setValue(value)}
      >
         <p
            className={cn(
               "font-poppins text-sm font-medium text-accent sm:text-base",
               {
                  "text-white": isActive,
               },
            )}
         >
            {value}
         </p>
      </div>
   );
}

function InfoRow({ title, value }) {
   return (
      <div className="flex flex-col items-start justify-between font-poppins font-medium uppercase text-black sm:flex-row sm:items-center sm:tracking-wide">
         <p>{title}</p>
         <p className="w-full text-gray-500 sm:max-w-[13.75rem] sm:text-black">
            {value}
         </p>
      </div>
   );
}
