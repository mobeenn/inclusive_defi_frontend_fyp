import * as yup from "yup";

// export const newProjectSchema = yup.object().shape({
//    projectTitle: yup.string().required("Project Title is required"),
//    fundNeeded: yup
//       .number()
//       .typeError("Funds Needed must be a number.")
//       .required("Funds Needed is required"),
//    projectDescription: yup.string().required("Project Description is required"),
//    totalSupply: yup
//       .number()
//       .typeError("Total Supply must be a number.")
//       .integer("Total Supply must be a whole number.")
//       .required("Total Supply is required"),
//    tokenIdoPrice: yup
//       .number()
//       .typeError("Token Price must be a number.")
//       .required("Token Price is required"),
//    fundRaisingDuration: yup
//       .number()
//       .typeError("Funds Raising Duration must be a number.")
//       .required("Funds Raising Duration is required"),
//    project_category: yup.string().required("Project Category is required"),
//    projectImage: yup.mixed().required("Project Image is required"),
// });

export const newProjectSchema = yup.object().shape({
   projectTitle: yup.string().required("Project Title is required"),
   fundNeeded: yup.string().required("Funds Needed is required"),
   projectDescription: yup.string().required("Project Description is required"),
   totalSupply: yup.string().required("Total Supply is required"),
   tokenIdoPrice: yup.string().required("Token Price is required"),
   fundRaisingDuration: yup
      .string()
      .required("Funds Raising Duration is required"),
   project_category: yup.string().required("Project Category is required"),
   projectImage: yup.mixed().required("Project Image is required"),
});

export const editProjectSchema = yup.object().shape({
   projectTitle: yup.string().required("Project Title is required"),
   fundNeeded: yup.string().required("Funds Needed is required"),
   projectDescription: yup.string().required("Project Description is required"),
   totalSupply: yup.string().required("Total Supply is required"),
   tokenIdoPrice: yup.string().required("Token Price is required"),
   fundRaisingDuration: yup
      .string()
      .required("Funds Raising Duration is required"),
   project_category: yup.string().required("Project Category is required"),
});
