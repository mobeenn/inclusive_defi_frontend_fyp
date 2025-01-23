"use client";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import Image from "next/image";
import moment from "moment";
import { useGetPublicProjectById, useGetWeb3Project } from "@/data/projects";
import { ProjectChart } from "@/components/Projects/project-chart";
import PageLoader from "@/components/ui/page-loader";
import { useStore } from "@/store";
import { useState } from "react";
import IssueAlert from "./issue-alert";
import { useAccount } from "wagmi";
import RaiseFundsModal from "./raise-modal";

export default function ProjectDetails({ params }) {
   const user = useStore((state) => state.user);
   const { address } = useAccount();

   const { data: projectData, isPending } = useGetPublicProjectById({
      projectId: params.id,
   });
   const { data: web3Project } = useGetWeb3Project(params.id, address);
   // console.log("🚀 ~ ProjectDetails ~ web3Project:", web3Project);

   const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
   const [isIssueAlertOpen, setIsIssueAlertOpen] = useState(false);
   const [issueText, setIssueText] = useState("");
   const [issueAction, setIssueAction] = useState("");

   const remainingFunds =
      projectData?.fundNeeded - projectData?.totalInvestment;

   const projectProgress = (
      (projectData?.totalInvestment / projectData?.fundNeeded) *
      100
   ).toFixed(0);

   // const [show, setShow] = useState(false);

   function handleRaiseClick() {
      if (!user) {
         setIssueText("Please login to your investor account first");
         setIsIssueAlertOpen(true);
         setIssueAction("signin");
         return;
      }

      if (user?.role !== "investor") {
         setIssueText(
            "YOU’RE CURRENTLY LOGGED IN AS CREATOR, PLEASE LOGIN TO YOUR INEVSTOR ACCOUNT TO MAKE FUNDS",
         );
         setIsIssueAlertOpen(true);
         setIssueAction("signin");
         return;
      }

      if (!address) {
         setIssueText("Please connect your wallet first");
         setIsIssueAlertOpen(true);
         setIssueAction("connect");
         return;
      }

      if (projectData?.projectStatus !== "active") {
         setIssueText("You can only raise funds for active projects");
         setIsIssueAlertOpen(true);
         setIssueAction("close");
         return;
      }

      setIsFundingModalOpen(true);
   }

   if (isPending) {
      return <PageLoader />;
   }

   function calcCanRaiseFunds() {
      if (!web3Project) return false;
      const { isCreatorWithdrawn, isAdminWithdrawn, fundRaisingDuration } =
         web3Project;

      const isTimeUp = moment().isAfter(moment(Number(fundRaisingDuration)));

      return !isCreatorWithdrawn && !isAdminWithdrawn && !isTimeUp;
   }

   const canRaiseFunds = calcCanRaiseFunds();

   return (
      <div className="bg-white">
         <div className="mx-auto max-w-[1400px] p-3 sm:p-[25px]">
            <div className="flex flex-col-reverse gap-3 lg:flex-row">
               {/* Project Stats Info */}
               <div className="rounded-[5px] px-[10px] py-[11px] pb-[30px] shadow-[0px_4px_4px_0px_#5350504D] sm:px-[25px] lg:min-w-[450px]">
                  <div className="flex items-center gap-4">
                     <div className="h-[64px] w-[64px] rounded-[50px] border p-[12px] sm:h-[76px] sm:w-[76px]">
                        <Image
                           src="/assets/landing/images/ethereum-logo.png"
                           alt="ethereum logo"
                           width={52}
                           height={52}
                        />
                     </div>
                     <div>
                        <h2 className="text-[20px] font-[600] uppercase text-primary-landing sm:text-[28px]">
                           {projectData?.projectTitle}
                        </h2>
                        <p className="text-[12px] capitalize">
                           Launch On:{" "}
                           {moment(projectData?.createdAt).format(
                              "MMM Do YYYY",
                           )}
                        </p>
                     </div>
                  </div>
                  {/* Stats Container */}
                  <div className="mt-[30px] grid grid-cols-2 gap-x-2 gap-y-6 pl-0 font-poppins sm:gap-[35px] sm:pl-[18px]">
                     <StatItem
                        icon="/assets/landing/icons/projects/launch-date.svg"
                        title="Launch Date"
                        value={moment(projectData?.createdAt).format(
                           "MMM Do YYYY",
                        )}
                     />
                     <StatItem
                        icon="/assets/landing/icons/projects/launch-date.svg"
                        title="Raise Duration"
                        value={`${projectData?.fundRaisingDuration} Days`}
                     />
                     <StatItem
                        icon="/assets/landing/icons/projects/money.svg"
                        title="Fundraise Goals"
                        value={`${projectData?.fundNeeded} BNB`}
                     />
                     <StatItem
                        icon="/assets/landing/icons/projects/total-tokens.svg"
                        title="Total Tokens"
                        value="200"
                     />
                     <StatItem
                        icon="/assets/landing/icons/projects/total-raise.svg"
                        title="Total Raise"
                        value={`${projectData?.totalInvestment} BNB`}
                     />
                     <StatItem
                        icon="/assets/landing/icons/projects/dollar-icon.svg"
                        title="Token Price for IDO"
                        value={`${projectData?.tokenIdoPrice} BNB`}
                     />
                     <div className="flex flex-col items-center gap-[5px] text-center [@media(min-width:480px)]:flex-row">
                        <Image
                           src="/assets/landing/icons/projects/funds-remaining.svg"
                           alt="fund"
                           height={35}
                           width={35}
                           className="size-[25px] [@media(min-width:480px)]:size-[35px]"
                        />
                        <div className="flex flex-col justify-between gap-1.5">
                           <span className="font-poppins text-[11px]">
                              Funds Remaining: {remainingFunds} BNB
                           </span>

                           <div className="h-2 rounded-full bg-gray-200 dark:bg-[#B0BFD2]">
                              <div
                                 className="h-2 rounded-full bg-[#0B5ECD]"
                                 style={{
                                    width: `${projectProgress}%`,
                                 }}
                              />
                              <div className="mt-1 w-[50%] text-end font-poppins text-[9px] font-medium text-black">
                                 {projectProgress}%
                              </div>
                           </div>
                        </div>
                     </div>
                     <StatItem
                        icon="/assets/landing/icons/projects/investors.svg"
                        title="Total Investors"
                        value={projectData?.investorsCount}
                     />
                  </div>
               </div>
               <div className="flex-1">
                  <Image
                     src={projectData?.projectImage}
                     alt="project cover image"
                     className="h-[394px] w-full rounded-[5px] object-cover"
                     width={1200}
                     height={600}
                  />
               </div>
            </div>
            <div className="mt-3 flex flex-col gap-3 lg:mt-[25px] lg:flex-row lg:gap-[24px]">
               <div className="flex basis-[65%] flex-col rounded-[5px] bg-white px-4 py-5 shadow-[0px_4px_4px_0px_#5350504D] sm:px-6 sm:pt-6 lg:pr-[26px] xl:pl-[69px] xl:pt-10">
                  <h1 className="font-roboto text-[24px] font-semibold uppercase text-primary-landing sm:text-[28px]">
                     project details
                  </h1>
                  <p className="pt-[26px] font-roboto text-[14px] font-light text-primary-landing sm:pr-[30px]">
                     {projectData?.projectDescription}
                  </p>
                  <div className="mt-auto flex flex-col items-center justify-between gap-6 py-[10px] pr-[26px] sm:flex-row">
                     <div className="mt-[10px] flex items-center justify-center gap-[9px] font-poppins font-semibold text-black">
                        Share on:
                        <div
                           className="flex size-[30px] items-center justify-center rounded-full bg-primary-landing p-1 text-white"
                           title="facebook"
                        >
                           <FiFacebook size={25} />
                        </div>
                        <div
                           className="flex size-[30px] items-center justify-center rounded-full bg-primary-landing p-1 text-white"
                           title="twitter"
                        >
                           <FaXTwitter size={25} />
                        </div>
                        <div
                           className="flex size-[30px] items-center justify-center rounded-full bg-primary-landing p-1 text-white"
                           title="discord"
                        >
                           <FaDiscord size={25} />
                        </div>
                     </div>
                     {/* <a
                        href={`http://100.25.20.178:3000/projects/${projectData?._id}`}
                        target="_blank"
                        className={`${
                           projectData?.projectStatus !== "active"
                              ? "pointer-events-none opacity-70"
                              : ""
                        }`}
                     > */}
                     {projectData?.projectStatus === "active" && (
                        <button
                           className="h-8 select-none rounded-[5px] bg-primary-landing px-6 font-poppins text-base font-medium text-white sm:h-10 sm:text-[19px]"
                           onClick={handleRaiseClick}
                        >
                           Raise funds
                        </button>
                     )}
                     {/* </a> */}
                  </div>
               </div>
               <div className="basis-[35%] rounded-[5px] bg-white px-[22px] py-[24px] shadow-[0px_4px_4px_0px_#5350504D]">
                  <p className="font-roboto text-[24px] font-semibold uppercase sm:text-[28px]">
                     Raise Details
                  </p>
                  {/* <div className="mt-[49px] flex items-center justify-center px-[40px]">
                     <Image
                        src="/assets/landing/icons/chart.svg"
                        alt="chart"
                        width={300}
                        height={250}
                     />
                  </div> */}
                  <ProjectChart
                     remainingFunds={+remainingFunds}
                     receivedFunds={+projectData?.totalInvestment}
                  />
               </div>
            </div>
            <div className="blue-gradient mx-auto mb-[50px] mt-[55px] w-full max-w-[1000px] items-center justify-between rounded-[22px] p-6 sm:rounded-[30px] sm:px-[70px] sm:py-4 lg:flex">
               <div className="mx-auto flex max-w-[468px] basis-[60%] flex-col gap-4 text-center font-poppins text-[22px] font-[600] text-white sm:text-[28px] sm:leading-[50px] lg:m-0 lg:text-left">
                  Planning some project in future? Lets get some funds to make
                  it happen.
                  <a href="http://100.25.20.178:3000/signin" target="_blank">
                     <button className="mx-auto inline-block h-[44px] rounded-[5px] bg-white px-3 font-poppins text-[16px] font-semibold text-sky sm:h-[54px] sm:px-5 sm:text-[18px]">
                        Launch My Project
                     </button>
                  </a>
               </div>

               <div className="hidden basis-[30%] lg:block">
                  <Image
                     src="/assets/landing/images/network.png"
                     alt="ico"
                     height={230}
                     width={230}
                  />
               </div>
            </div>
         </div>
         {/* {show && <RaiseFundModal handleClose={() => setShow(!show)} />} */}
         {projectData?.projectStatus === "active" && (
            <IssueAlert
               open={isIssueAlertOpen}
               setOpen={setIsIssueAlertOpen}
               project={projectData}
               issueText={issueText}
               issueAction={issueAction}
            />
         )}
         {user?.role === "investor" &&
            projectData?.projectStatus === "active" && (
               <RaiseFundsModal
                  open={isFundingModalOpen}
                  setOpen={setIsFundingModalOpen}
                  address={address}
                  project={projectData}
                  canRaiseFunds={canRaiseFunds}
                  remainingFunds={remainingFunds}
               />
            )}
      </div>
   );
}

function StatItem({ icon, title, value }) {
   return (
      <div className="flex flex-col items-center gap-[5px] text-center [@media(min-width:480px)]:flex-row [@media(min-width:480px)]:text-left">
         <div className="rounded-[50px]">
            <Image
               src={icon}
               alt="fund"
               height={35}
               width={35}
               className="size-[25px] [@media(min-width:480px)]:size-[35px]"
            />
         </div>
         <div>
            <p className="text-[11px] font-[300]">{title}</p>
            <p className="text-[12px] font-[400]">{value}</p>
         </div>
      </div>
   );
}
