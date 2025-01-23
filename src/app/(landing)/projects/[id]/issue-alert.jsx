import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogCancelPrimitive,
} from "@/components/ui/alert-dialog";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

export default function IssueAlert({
   open,
   setOpen,
   project,
   issueText,
   issueAction,
}) {
   const { openConnectModal } = useConnectModal();

   function handleClose() {
      setOpen(false);
   }

   function handleConnectWallet() {
      setOpen(false);
      openConnectModal();
   }

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent className="pb-[64px]">
            <div className="mb-8 flex items-center justify-between">
               <h2 className="font-poppins font-medium uppercase tracking-tight text-[#B0AECC] text-[11.px]">
                  Raise Funds
               </h2>
               <AlertDialogCancelPrimitive>
                  <Image
                     src="/assets/icons/alert-cross.svg"
                     alt="close"
                     height={24}
                     width={24}
                  />
               </AlertDialogCancelPrimitive>
            </div>
            <h2 className="text-center font-poppins text-xl font-semibold uppercase text-white">
               {`Raise funds for "${project?.projectTitle}"`}
            </h2>
            <p className="-mt-4 mb-6 text-center font-poppins uppercase text-[#FAFF0A]">
               {issueText}
            </p>

            {/* Actions */}
            <AlertDialogFooter>
               {issueAction === "close" && (
                  <button
                     className="primary-button uppsecase min-w-[6.25rem] rounded px-[6px] py-1 text-center font-poppins text-[20px] font-medium"
                     onClick={handleClose}
                  >
                     Close
                  </button>
               )}

               {issueAction === "signin" && (
                  <Link href="/signin">
                     <button className="primary-button min-w-[6.25rem] rounded px-[6px] py-1 text-center font-poppins text-[20px] font-medium uppercase">
                        Sign In
                     </button>
                  </Link>
               )}

               {issueAction === "connect" && (
                  <button
                     className="primary-button min-w-[6.25rem] rounded px-3 py-1 text-center font-poppins text-[20px] font-medium uppercase"
                     onClick={handleConnectWallet}
                     type="button"
                  >
                     Connect Wallet
                  </button>
               )}
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
