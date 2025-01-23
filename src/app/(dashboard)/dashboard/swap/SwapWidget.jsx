"use client";

import { Button } from "@/components/ui/button";
import { lightTheme, SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Input from "@/common/input";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useGetBalance, useGetBuyPrice, useGetOwner } from "@/data/ico";
import { useIco } from "@/web3/providers/ico-provider";
import { addTransaction } from "@/api/transactions-history";

const TOKEN_LIST = "https://cloudflare-ipfs.com/ipns/tokens.uniswap.org";
const jsonRpcUrlMap = {
   1: ["https://main.infura.io/v3/15c9a4fbcf3f477f978e0e2765809365"],
};

const myLightTheme = {
   ...lightTheme,
   accent: "#020F33",
   accentSoft: "#020f334d",
   primary: "#000000",
   secondary: "#565A69",
};

export default function SwapWidgetComponent() {
   const { address } = useAccount();
   const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

   useEffect(() => {
      window.Browser = {
         T: () => {},
      };
   }, []);

   /*
   Opening the modal for buying token
   */
   function handleOpenModal() {
      if (!address) {
         toast.error("Please connect your wallet");
         return;
      }
      setIsBuyModalOpen(true);
   }

   return (
      <>
         <div className="flex justify-center">
            <div className="Uniswap mt-10">
               <SwapWidget
                  tokenList="https://tokens.uniswap.org"
                  // jsonRpcEndpoint={jsonRpcUrlMap}
                  // defaultInputAmount="0.1"
                  width={"100%"}
                  theme={myLightTheme}
               />
               <Button
                  className="mt-5 w-full"
                  variant="custom"
                  onClick={handleOpenModal}
               >
                  BUY
               </Button>
            </div>
         </div>
         <BuyModal open={isBuyModalOpen} setOpen={setIsBuyModalOpen} />
      </>
   );
}

/*
Modal for buying token
*/
function BuyModal({ open, setOpen }) {
   const { address } = useAccount();
   const { buyToken } = useIco();

   const { data: buyPrice } = useGetBuyPrice();
   const { data: owner } = useGetOwner();
   const { data: balance } = useGetBalance({ userAddress: owner });

   const [amount, setAmount] = useState(0);
   const [toBeReceived, setToBeReceived] = useState(0);
   const [isLoading, setIsLoading] = useState(false);

   function handleChange(e) {
      setAmount(e.target.value);
      setToBeReceived(Math.round(e.target.value / buyPrice));
   }

   const isBalanceEnough = balance >= toBeReceived;

   /*
   Buying token and storing the transaction in the database
   */
   async function handleBuyToken() {
      if (!address) {
         toast.error("Please connect your wallet");
         return;
      }
      if (amount <= 0) {
         toast.error("Please enter a valid amount");
         return;
      }
      if (!isBalanceEnough) {
         toast.error("Insufficient balance");
         return;
      }
      try {
         setIsLoading(true);

         const contractRes = await buyToken(amount);
         if (!contractRes?.transactionHash) {
            toast.error("Something went wrong");
            return;
         }

         const res = await addTransaction({
            Hash: contractRes.transactionHash,
            transaction_type: "token",
            wallet_address: address,
            type: "buy",
            amount: amount,
            symbol: "INCD",
         });

         toast.success("Token purchased successfully");
         setOpen(false);
      } catch (error) {
         toast.error("Something went wrong");
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent>
            <div className="mt-2">
               <h2 className="mb-8 text-center text-2xl font-semibold uppercase text-primary">
                  Buy Token
               </h2>
               <div className="space-y-3">
                  <div className="flex items-center justify-between">
                     <p>
                        Token Price:{" "}
                        <span className="font-semibold">{buyPrice} BNB</span>
                     </p>
                     <p>
                        Available Tokens:{" "}
                        <span className="font-semibold">{balance} INCD</span>
                     </p>
                  </div>
                  <Input type="number" onChange={handleChange} />
                  <p>
                     You will receive ≈{" "}
                     <span className="font-semibold">{toBeReceived} INCD</span>
                  </p>
               </div>
               <div className="mt-6 flex justify-center">
                  <Button
                     className="w-[100px] text-base"
                     onClick={handleBuyToken}
                     loading={isLoading}
                     disabled={!isBalanceEnough}
                  >
                     Buy
                  </Button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
