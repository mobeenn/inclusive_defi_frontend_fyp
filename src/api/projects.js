import { axiosAuth, axiosPrivate, axiosPrivateForm } from "@/lib/axios";

export async function getAllProjects({ page, perPage }) {
   try {
      const res = await axiosPrivate.get(
         `/project/get-all-projects?limit=${perPage}&page_number=${page}`,
      );
      return res?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function getAllActiveProjects({ page, perPage }) {
   try {
      const res = await axiosPrivate.get(
         `/project/user-active-projects?limit=${perPage}&page_number=${page}`,
      );
      return res?.data;
   } catch (error) {
      console.log(error);
   }
}
export async function getAllCompletedProjects({ page, perPage }) {
   try {
      const res = await axiosPrivate.get(
         `/project/user-completed-projects?limit=${perPage}&page_number=${page}`,
      );
      return res?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function getAllPendingProjects({ page, perPage }) {
   try {
      const res = await axiosPrivate.get(
         `/project/user-pending-projects?limit=${perPage}&page_number=${page}`,
      );
      return res?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function getProjectById(id) {
   try {
      const res = await axiosPrivate.post("/project/get-projects_byId", {
         projectId: id,
      });
      return res?.data?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function getAllInvestors(data) {
   try {
      const res = await axiosPrivate.post("/investor/get-investment", data);
      return res?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function getAllMyNotifications(data) {
   try {
      const res = await axiosPrivate.post("/chat/get-notification", data);
      return res?.data;
   } catch (error) {
      console.log(error);
   }
}

export async function createProject(data) {
   try {
      const res = await axiosPrivateForm.post("/project/create-project", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function editProject(data) {
   try {
      const res = await axiosPrivateForm.post("/project/edit-project", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function deleteProject(data) {
   try {
      const res = await axiosPrivate.post("/project/delete-project", data);
      return res;
   } catch (error) {
      throw error;
   }
}

export async function updateProjectHash(data) {
   try {
      const res = await axiosPrivate.post(
         "/project/update-project-status",
         data,
      );
      return res;
   } catch (error) {
      throw error;
   }
}

export async function getProjectsSummary() {
   try {
      const res = await axiosPrivate.get("/project/userProjectDetails");
      return res.data.data;
   } catch (error) {
      throw error;
   }
}

export async function getAllPublicProjects({ page, perPage, status = "all" }) {
   try {
      const res = await axiosAuth.get(
         `/project/get-all-Publicprojects?limit=${perPage}&page_number=${page}&status=${status}`,
      );
      return res?.data?.data;
   } catch (error) {
      throw error;
   }
}

export async function getPublicProjectById(data) {
   try {
      const res = await axiosAuth.post(
         "/project/get-PublicProjects_byId",
         data,
      );
      return res?.data?.data;
   } catch (error) {
      throw error;
   }
}

export async function getMyFundedProjects(data) {
   try {
      const res = await axiosPrivate.post(
         "/investor/get-my-project-investment",
         data,
      );
      return res?.data;
   } catch (error) {
      throw error;
   }
}
