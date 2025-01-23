import {
   getAllActiveProjects,
   getAllCompletedProjects,
   getAllInvestors,
   getAllMyNotifications,
   getAllPendingProjects,
   getAllProjects,
   getAllPublicProjects,
   getMyFundedProjects,
   getProjectById,
   getProjectsSummary,
   getPublicProjectById,
} from "@/api/projects";
import { useCrowdFunding } from "@/web3/providers/crowd-funding-provider";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useGetAllProjects({ page, perPage }) {
   return useQuery({
      queryKey: ["all-projects", page, perPage],
      queryFn: () => getAllProjects({ page, perPage }),
      placeholderData: keepPreviousData,
   });
}
export function useGetMyNotifications({ page_number, limit }) {
   return useQuery({
      queryKey: ["get-notification", page_number, limit],
      queryFn: () => getAllMyNotifications({ page_number, limit }),
      placeholderData: keepPreviousData,
   });
}

export function useGetAllActiveProjects({ page, perPage }) {
   return useQuery({
      queryKey: ["active-projects", page, perPage],
      queryFn: () => getAllActiveProjects({ page, perPage }),
      placeholderData: keepPreviousData,
   });
}
export function useGetAllCompletedProjects({ page, perPage }) {
   return useQuery({
      queryKey: ["completed-projects", page, perPage],
      queryFn: () => getAllCompletedProjects({ page, perPage }),
      placeholderData: keepPreviousData,
   });
}
export function useGetAllInvestorsList({ projectId, limit, page_number }) {
   return useQuery({
      queryKey: ["get-investment", projectId, limit, page_number],
      queryFn: () => getAllInvestors({ projectId, limit, page_number }),
      placeholderData: keepPreviousData,
   });
}

export function useGetAllPendingProjects({ page, perPage }) {
   return useQuery({
      queryKey: ["pending-projects", page, perPage],
      queryFn: () => getAllPendingProjects({ page, perPage }),
      placeholderData: keepPreviousData,
   });
}

export function useGetProjectById(id) {
   return useQuery({
      queryKey: ["project", id],
      queryFn: () => getProjectById(id),
   });
}

export function useGetWeb3Project(id, address) {
   const { readProject } = useCrowdFunding();

   return useQuery({
      queryKey: ["web3-project", id, address],
      queryFn: () => readProject(id),
   });
}

export function useGetProjectsSummary() {
   return useQuery({
      queryKey: ["projects-summary"],
      queryFn: () => getProjectsSummary(),
   });
}

export function useGetAllPublicProjects({ page, perPage, status }) {
   return useQuery({
      queryKey: ["public-projects", page, perPage, status],
      queryFn: () => getAllPublicProjects({ page, perPage, status }),
      placeholderData: keepPreviousData,
   });
}

export function useGetPublicProjectById({ projectId }) {
   return useQuery({
      queryKey: ["public-project", projectId],
      queryFn: () => getPublicProjectById({ projectId }),
   });
}

export function useGetMyFundedProjects({ page_number, limit }) {
   return useQuery({
      queryKey: ["my-funded-projects", page_number, limit],
      queryFn: () => getMyFundedProjects({ page_number, limit }),
      placeholderData: keepPreviousData,
   });
}
