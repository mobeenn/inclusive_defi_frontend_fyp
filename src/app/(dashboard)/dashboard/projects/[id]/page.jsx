"use client";
import Image from "next/image";
import InvestorsTable from "./InvestorsTable";
import {
   useGetAllInvestorsList,
   useGetProjectById,
   useGetWeb3Project,
} from "@/data/projects";
import moment from "moment";
import PageLoader from "@/components/ui/page-loader";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";
import Input from "@/common/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useCrowdFunding } from "@/web3/providers/crowd-funding-provider";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useFormik } from "formik";
import { investInProject } from "@/api/investments";
import { ProjectChart } from "@/components/Projects/project-chart";
import { notFound } from "next/navigation";

export default function ProjectDetails({ params }) {
   const user = useStore((state) => state.user);
   const { address } = useAccount();
   const { withdraw } = useCrowdFunding();
   const { id } = params;

   const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
   const [isWithdrawlLoading, setIsWithdrawlLoading] = useState(false);
   const InvestorPayload = { projectId: id, limit: 1000, page_number: 1 };

   const { data: project, isPending } = useGetProjectById(id);
   const { data: investors } = useGetAllInvestorsList(InvestorPayload);

   console.log("🚀 ~ ProjectDetails ~ project:", project);
   console.log("🚀 ~ ProjectDetails ~ investors:", investors);

   const { data: web3Project } = useGetWeb3Project(id, address);

   const remainingFunds = project?.fundNeeded - project?.totalInvestment;

   if (isPending || !user) {
      return <PageLoader />;
   } else if (user?.role === "investor") {
      return notFound();
   }

   async function handleWithdrawl() {
      if (!address) {
         toast.error("Please connect your wallet.");
         return;
      }
      if (!canWithdraw()) {
         toast.error("You can't withdraw yet!");
         return;
      }
      try {
         setIsWithdrawlLoading(true);
         const contractRes = await withdraw(project._id);
         toast.success("Funds withdrawn successfully");
      } catch (error) {
         toast.error("Something went wrong!");
         console.log(error);
      } finally {
         setIsWithdrawlLoading(false);
      }
   }

   function canWithdraw() {
      if (!web3Project) return false;

      const {
         withdrawApproval,
         isCreatorWithdrawn,
         isAdminWithdrawn,
         fundNeeded,
         totalFunds,
         fundRaisingEndDate,
      } = web3Project;

      const isGoalReached = fundNeeded >= totalFunds;
      const isTimeUp = moment().isAfter(moment(fundRaisingEndDate));

      return (
         isGoalReached &&
         isTimeUp &&
         !isCreatorWithdrawn &&
         !isAdminWithdrawn &&
         withdrawApproval &&
         address
      );
   }

   // function canRaiseFunds() {
   //    if (!web3Project) return false;
   //    const { isCreatorWithdrawn, isAdminWithdrawn } = web3Project;

   //    return (
   //       !isCreatorWithdrawn &&
   //       !isAdminWithdrawn &&
   //       address &&
   //       project?.projectStatus === "active"
   //    );
   // }

   return (
      <div className="@container">
         <div className="flex flex-col-reverse gap-3 lg:flex-row">
            {/* Info Box */}
            <div className="basis-[45%] rounded-[5px] bg-white px-[16px] py-[11px] pb-[30px] shadow-[0px_7px_23px_0px_#0000000D] sm:px-[25px] lg:min-w-[430px]">
               <div className="flex items-center gap-4">
                  <div className="h-[64px] w-[64px] shrink-0 rounded-[50px] border border-black p-[12px] sm:h-[76px] sm:w-[76px]">
                     <Image
                        src="/assets/icons/bnb-logo.png"
                        alt="ethereum logo"
                        width={52}
                        height={52}
                     />
                  </div>
                  <div className="w-full">
                     <h2 className="text-xl font-[600] uppercase tracking-wide text-[#020F33] sm:text-[28px] lg:text-center">
                        {project?.projectTitle}
                     </h2>
                  </div>
               </div>
               <div className="mt-[30px] grid grid-cols-2 gap-x-2 gap-y-6 pl-0 sm:gap-[35px] sm:pl-[18px]">
                  <StatItem
                     title="Launch Date"
                     value={moment(project?.createdAt).format("DD MMM, YYYY")}
                     icon="/assets/landing/icons/projects/launch-date.svg"
                  />
                  <StatItem
                     title="Raise Duration"
                     value={project?.fundRaisingDuration + " Days"}
                     icon="/assets/landing/icons/projects/launch-date.svg"
                  />
                  <StatItem
                     title="Fundraise Goal"
                     value={project?.fundNeeded + " BNB"}
                     icon="/assets/landing/icons/projects/money.svg"
                  />
                  <StatItem
                     title="Total Tokens"
                     value="200"
                     icon="/assets/landing/icons/projects/total-tokens.svg"
                  />
                  <StatItem
                     title="Total Raise"
                     value={project?.totalInvestment + " BNB"}
                     icon="/assets/landing/icons/projects/total-raise.svg"
                  />
                  <StatItem
                     title="Token Price for IDO"
                     value={project?.tokenIdoPrice + " BNB"}
                     icon="/assets/landing/icons/projects/dollar-icon.svg"
                  />
                  <StatItem
                     title="Total Investors"
                     value={project?.investorsCount}
                     icon="/assets/landing/icons/projects/investors.svg"
                  />
               </div>
            </div>
            <div>
               <Image
                  src={
                     project.projectImage || "/assets/images/project-cover.png"
                  }
                  alt="project cover image"
                  className="rounded-[5px] object-cover lg:h-[25rem]"
                  width={1000}
                  height={500}
               />
            </div>
         </div>
         <div className="mt-3 flex flex-col gap-3 lg:mt-[25px] lg:flex-row lg:gap-[24px]">
            <div className="relative basis-[65%] rounded-[5px] bg-white px-4 py-5 shadow-[0px_7px_23px_0px_#0000000D] sm:px-6 sm:pt-6 lg:pr-[26px] xl:pl-[69px] xl:pt-10">
               <h1 className="text-xl font-semibold uppercase tracking-wide text-[#020F33] sm:text-[28px]">
                  Project Details
               </h1>
               <p className="pt-3 text-[14px] font-light text-[#020F33] sm:pt-6 lg:pr-[30px]">
                  {project.projectDescription}
               </p>
               {/* {user?.role === "investor" && (
                  <div className="absolute bottom-5 right-5">
                     <Button
                        variant="custom"
                        disabled={!canRaiseFunds()}
                        onClick={() => setIsFundingModalOpen(true)}
                        className="!h-10 !px-4 text-base"
                     >
                        Raise Funds
                     </Button>
                  </div>
               )} */}
               {/* {user?.role === "creator" && (
                  <div className="absolute bottom-5 right-5">
                     <Button
                        variant="custom"
                        disabled={!canWithdraw()}
                        loading={isWithdrawlLoading}
                        onClick={handleWithdrawl}
                        className="!h-10 !px-4 text-base"
                     >
                        Withdraw
                     </Button>
                  </div>
               )} */}
            </div>
            <div className="basis-[35%] rounded-[5px] bg-white px-[22px] py-[24px] shadow-[0px_7px_23px_0px_#0000000D]">
               <p className="text-xl font-semibold uppercase sm:text-[28px]">
                  Fundraise Details
               </p>
               {/* <div className="mt-[49px] flex items-center justify-center px-[40px]">
                  <Image
                     src="/assets/icons/chart.svg"
                     alt="chart"
                     width={300}
                     height={250}
                  />
               </div> */}
               <ProjectChart
                  remainingFunds={remainingFunds}
                  receivedFunds={project?.totalInvestment}
               />
            </div>
         </div>

         <div className="mt-3 flex flex-col gap-3 lg:mt-[25px] lg:flex-row lg:gap-[24px]">
            {/* Funding Table */}
            <InvestorsTable investors={investors?.data} />
            {user?.role === "creator" && (
               <div className="basis-[35%] rounded-[5px] bg-white px-[22px] py-[24px] shadow-[0px_7px_23px_0px_#0000000D]">
                  <div className="flex items-center justify-center px-[40px]">
                     <Image
                        src="/assets/images/withdraw.png"
                        alt="chart"
                        width={300}
                        height={250}
                     />
                  </div>
                  <p className="text-center text-lg font-semibold uppercase tracking-wide text-[#020F33]">
                     Funding Received by Investors
                  </p>
                  <p className="text-center text-2xl font-semibold uppercase tracking-wide text-[#020F33]">
                     {investors?.total_amount || 0} BNB
                  </p>

                  <div className="mt-3 flex w-full flex-row items-center justify-center self-center">
                     {user?.role === "creator" && (
                        <Button
                           variant="green"
                           disabled={!canWithdraw()}
                           loading={isWithdrawlLoading}
                           onClick={handleWithdrawl}
                           className="!h-10 !px-4 text-base"
                        >
                           Withdraw
                        </Button>
                     )}
                  </div>
               </div>
            )}
         </div>

         {/* {user?.role === "investor" && (
            <RaiseFundsModal
               open={isFundingModalOpen}
               setOpen={setIsFundingModalOpen}
               address={address}
               project={project}
               canRaiseFunds={canRaiseFunds}
            />
         )} */}
      </div>
   );
}

function StatItem({ title, value, icon }) {
   return (
      <div className="flex gap-1.5">
         <div className="h-[35px] w-[35px]">
            <Image src={icon} alt={title} height={35} width={35} />
         </div>
         <div>
            <p className="text-[11px] font-[300]">{title}</p>
            <p className="text-[12px] font-[400]">{value}</p>
         </div>
      </div>
   );
}

// function RaiseFundsModal({ open, setOpen, address, project, canRaiseFunds }) {
//    const { contribute } = useCrowdFunding();

//    const initialValues = {
//       fundingAmount: 0,
//    };

//    const {
//       values,
//       errors,
//       touched,
//       handleBlur,
//       handleChange,
//       handleSubmit,
//       isSubmitting,
//       resetForm,
//    } = useFormik({
//       initialValues,
//       validate: (values) => {
//          const errors = {};
//          if (!values.fundingAmount) {
//             errors.fundingAmount = "Please enter an amount";
//          }
//          return errors;
//       },
//       onSubmit,
//    });

//    async function onSubmit(values) {
//       if (!address) {
//          toast.error("Please connect your wallet.");
//          return;
//       }
//       if (!canRaiseFunds()) {
//          toast.error("You can't raise funds yet!");
//          return;
//       }

//       try {
//          // Investing in project
//          const contractRes = await contribute(
//             project._id,
//             values.fundingAmount,
//          );

//          console.log("🚀 ~ onSubmit ~ contractRes:", contractRes);
//          if (!contractRes.transactionHash) {
//             toast.error("Something went wrong!");
//             return;
//          }

//          // Storing transaction info in database
//          const data = {
//             projectId: project._id,
//             projectOwnerId: project.userId,
//             transactionHash: contractRes.transactionHash,
//             symbol: "ETH",
//             symbol_logo:
//                "https://inclusive-defi.s3.us-east-1.amazonaws.com/user-photos/1715972345370-inclusive-defi",
//             wallet_address: address,
//             status: "success",
//             paymentStatus: "success",
//             investedAmount: values.fundingAmount.toString(),
//          };

//          const res = await investInProject(data);

//          console.log("🚀 ~ onSubmit ~ res:", res);

//          toast.success(res?.data?.message);
//          resetForm();
//       } catch (error) {
//          if (error?.response?.data?.message) {
//             toast.error(error?.response?.data?.message);
//          } else {
//             console.log(error);
//             toast.error("Something went wrong");
//          }
//       }
//    }

//    return (
//       <Dialog open={open} onOpenChange={setOpen}>
//          <DialogContent>
//             <div className="mt-4">
//                <h2 className="mb-4 text-center text-[24px] font-semibold uppercase text-primary">
//                   Raise funds for {project.projectTitle}
//                </h2>
//                <p className="text-promary mb-10 text-center text-sm uppercase">
//                   Enter the amount of your widh and become the investor in this
//                   project mega project
//                </p>
//                <form className="space-y-8" onSubmit={handleSubmit}>
//                   <section>
//                      <Input
//                         type="number"
//                         placeholder="Enter amount in USDT"
//                         name="fundingAmount"
//                         value={values.fundingAmount}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.fundingAmount && errors.fundingAmount}
//                      />
//                   </section>

//                   <div className="flex justify-center">
//                      <Button
//                         variant="custom"
//                         type="submit"
//                         className="mt-12 font-normal"
//                         loading={isSubmitting}
//                      >
//                         Send
//                      </Button>
//                   </div>
//                </form>
//             </div>
//          </DialogContent>
//       </Dialog>
//    );
// }
