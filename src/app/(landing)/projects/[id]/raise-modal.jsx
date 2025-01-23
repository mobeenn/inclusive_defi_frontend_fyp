import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogCancelPrimitive,
} from "@/components/ui/alert-dialog";
import { useFormik } from "formik";
import Input from "@/common/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCrowdFunding } from "@/web3/providers/crowd-funding-provider";
import { investInProject } from "@/api/investments";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetBuyPriceInWei, useGetSystemFeeInWei } from "@/data/ico";

export default function RaiseFundsModal({
   open,
   setOpen,
   address,
   project,
   canRaiseFunds,
   remainingFunds,
}) {
   const { contribute } = useCrowdFunding();
   const router = useRouter();

   const { data: systemFeeInWei } = useGetSystemFeeInWei();
   const { data: buyPriceInWei } = useGetBuyPriceInWei();

   const initialValues = {
      fundingAmount: 0,
   };

   const {
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
      resetForm,
   } = useFormik({
      initialValues,
      validate: (values) => {
         const errors = {};
         if (!values.fundingAmount) {
            errors.fundingAmount = "Please enter an amount";
         }
         return errors;
      },
      onSubmit,
   });

   async function onSubmit(values) {
      if (!address) {
         toast.error("Please connect your wallet.");
         return;
      }

      if (!canRaiseFunds) {
         toast.error("Time is up, you can't raise funds now!");
         return;
      }

      if (values.fundingAmount > remainingFunds) {
         toast.error("You can't invest more than remaining funds");
         return;
      }

      try {
         // Investing in project
         const contractRes = await contribute(
            project?._id,
            values.fundingAmount,
         );

         if (!contractRes.transactionHash) {
            toast.error("Something went wrong!");
            return;
         }

         // Storing transaction info in database
         const data = {
            projectId: project._id,
            projectOwnerId: project.userId,
            transactionHash: contractRes.transactionHash,
            symbol: "ETH",
            symbol_logo:
               "https://inclusive-defi.s3.us-east-1.amazonaws.com/user-photos/1715972345370-inclusive-defi",
            wallet_address: address,
            status: "success",
            paymentStatus: "success",
            investedAmount: values.fundingAmount.toString(),
            ICO_tokens: calculateICOTokens({
               fundingAmount: values.fundingAmount,
               systemFeeInWei,
               buyPriceInWei,
            }),
         };

         await investInProject(data);

         resetForm();
         toast.success(
            "Amount invested successfully. You can check your investments from your panel.",
         );
         router.push("/dashboard/investments");
      } catch (error) {
         if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
         } else {
            console.log(error);
            toast.error("Something went wrong");
         }
      }
   }

   // function to calculate ICO tokens
   function calculateICOTokens({
      fundingAmount,
      systemFeeInWei,
      buyPriceInWei,
   }) {
      const fundingAmountInWei = fundingAmount * 10 ** 18;
      const remainingAmount = fundingAmountInWei - systemFeeInWei;
      const tokens = (remainingAmount / buyPriceInWei).toFixed(2);
      return tokens;
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
            <div className="mt-4">
               <h2 className="text-center font-poppins text-xl font-semibold uppercase text-white">
                  {`Raise funds for "${project?.projectTitle}"`}
               </h2>
               <p className="mb-10 mt-4 text-center font-poppins uppercase text-white">
                  enter the amount of your wish and become the investor in this
                  mega project
               </p>
               <form className="space-y-6" onSubmit={handleSubmit}>
                  <section className="flex items-center">
                     <div className="flex size-[3.5rem] shrink-0 items-center justify-center bg-white">
                        <Image
                           src="/assets/icons/bnb-logo.png"
                           alt="bnb"
                           width={28}
                           height={28}
                        />
                     </div>
                     <Input
                        type="number"
                        placeholder="Enter amount in USDT"
                        className="h-[3.5rem] text-base"
                        name="fundingAmount"
                        value={values.fundingAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.fundingAmount && errors.fundingAmount}
                     />
                  </section>

                  <div className="flex justify-center">
                     <Button
                        variant="auth"
                        type="submit"
                        className="font-xl mt-12 font-medium uppercase"
                        loading={isSubmitting}
                     >
                        Raise Now
                     </Button>
                  </div>
               </form>
            </div>
         </AlertDialogContent>
      </AlertDialog>
   );
}
