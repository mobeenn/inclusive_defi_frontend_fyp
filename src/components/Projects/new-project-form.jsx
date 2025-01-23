"use client";
import {
   createProject,
   deleteProject,
   updateProjectHash,
} from "@/api/projects";
import Checkbox from "@/common/checkbox";
import Input from "@/common/input";
import Label from "@/common/label";
import { Select } from "@/common/select";
import Textarea from "@/common/textarea";
import { Button } from "@/components/ui/button";
import { newProjectSchema } from "@/validation/project";
import { useCrowdFunding } from "@/web3/providers/crowd-funding-provider";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const CATEGORIES = [
   "Finance",
   "Marketing/Sales",
   "Technology",
   "Research & Development",
   "Transportation",
   "Science",
   "Retail",
   "Insurance",
   "Construction",
   "Commerce",
   "Foodservice",
   "Education",
   "Other",
];

const initialValues = {
   projectTitle: "",
   fundNeeded: "",
   projectDescription: "",
   totalSupply: "",
   tokenIdoPrice: "",
   fundRaisingDuration: "",
   project_category: "",
   customCategory: "",
   projectImage: null,
};

export default function NewProjectForm() {
   const router = useRouter();
   const { createProject: createProjectContract } = useCrowdFunding();
   const { address } = useAccount();
   const [isProjectPending, setIsProjectPending] = useState(false);

   const handleCheckboxChange = (event) => {
      setIsProjectPending(event.target.checked);
   };

   const {
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue,
      isSubmitting,
      resetForm,
   } = useFormik({
      initialValues,
      validationSchema: newProjectSchema,
      validate: (values) => {
         const errors = {};
         if (
            values.project_category === "Other" &&
            values.customCategory === ""
         ) {
            errors.customCategory = "Please enter a category";
         }
         return errors;
      },
      onSubmit,
   });

   async function onSubmit(values) {
      if (!address) {
         toast.error("Please connect your wallet");
         return;
      }

      try {
         const formData = new FormData();
         formData.append("projectTitle", values.projectTitle);
         formData.append("fundNeeded", values.fundNeeded);
         formData.append("projectDescription", values.projectDescription);
         formData.append("totalSupply", values.totalSupply);
         formData.append("tokenIdoPrice", values.tokenIdoPrice);
         formData.append("fundRaisingDuration", values.fundRaisingDuration);
         formData.append("projectImage", values.projectImage);
         formData.append(
            "projectStatus",
            !isProjectPending ? "active" : "pending",
         );
         if (values.project_category === "Other") {
            formData.append("project_category", values.customCategory);
         } else {
            formData.append("project_category", values.project_category);
         }

         // outputFormData(formData);

         // Store the project in the backend
         const res = await createProject(formData);
         var createdProject = res?.data?.data;

         if (!createdProject) {
            toast.error("Project creation failed");
            return;
         }

         const creationDate = new Date(createdProject?.createdAt).getTime();
         const durationInDays = createdProject?.fundRaisingDuration;
         const endDate = creationDate + durationInDays * 24 * 60 * 60 * 1000;

         // Create the project in the contract
         const contractRes = await createProjectContract(
            Number(createdProject.fundNeeded),
            endDate,
            createdProject._id,
         );

         if (!contractRes.transactionHash) {
            await deleteProject({
               projectId: createdProject._id,
               forced: true,
            });
            toast.error("Hash not found");
            return;
         }

         // Update the project in the backend
         await updateProjectHash({
            projectId: createdProject._id,
            transaction_hash: contractRes.transactionHash,
         });

         toast.success("Project created successfully");
         router.push("/dashboard/projects");
      } catch (error) {
         if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
         } else {
            await deleteProject({
               projectId: createdProject._id,
               forced: true,
            });
            toast.error("Something went wrong");
         }
      }
   }

   function outputFormData(formData) {
      formData.forEach((value, key) => {
         console.log("🚀 ~ onSubmit ~ updateRes:", updateRes);
         console.log(`${key}: ${value}`);
      });
      console.log("🚀 ~ formData.forEach ~ updateRes:", updateRes);
   }

   function handleImgChange(e, name) {
      if (e.target.files && e.target.files[0]) {
         setFieldValue(name, e.currentTarget.files[0]);
      }
   }

   return (
      <form className="max-w-[1170px] space-y-6" onSubmit={handleSubmit}>
         {/* Title & Funds */}
         <div className="grid grid-cols-1 gap-x-6 gap-y-6 @[1070px]:gap-x-[4.5rem] md:grid-cols-2">
            {/* Title */}
            <section>
               <Label htmlFor="title">Title</Label>
               <Input
                  id="title"
                  placeholder="Enter Project Title"
                  name="projectTitle"
                  error={touched.projectTitle && errors.projectTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
               />
            </section>
            {/* Total Funds */}
            <section>
               <Label htmlFor="totalFunds">Total Funds Needed</Label>
               <Input
                  id="totalFunds"
                  placeholder="Write the amount you need for this project"
                  name="fundNeeded"
                  error={touched.fundNeeded && errors.fundNeeded}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
               />
            </section>
         </div>

         {/* Description */}
         <section>
            <Label htmlFor="description">Description</Label>
            <Textarea
               placeholder="Write the project details here..."
               name="projectDescription"
               error={touched.projectDescription && errors.projectDescription}
               onChange={handleChange}
               onBlur={handleBlur}
            />
         </section>

         <div className="grid grid-cols-1 gap-x-6 gap-y-6 @[1070px]:gap-x-[4.5rem] md:grid-cols-2">
            {/* Total Supplies */}
            <section>
               <Label htmlFor="totalSupplies">Total supply</Label>
               <Input
                  id="totalSupplies"
                  placeholder="Write the total supply"
                  name="totalSupply"
                  error={touched.totalSupply && errors.totalSupply}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  allowDecimal={false}
               />
            </section>

            {/* Token Price */}
            <section>
               <Label htmlFor="price">Token Price for IDO</Label>
               <Input
                  id="price"
                  placeholder="Write the amount you need for this Write the token price for IDO"
                  name="tokenIdoPrice"
                  error={touched.tokenIdoPrice && errors.tokenIdoPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
               />
            </section>

            {/* Funds Raising Duration */}
            <section>
               <Label htmlFor="fundDuration">
                  Funds Raising Duration (in Days)
               </Label>
               <Input
                  id="fundDuration"
                  name="fundRaisingDuration"
                  allowDecimal={false}
                  error={
                     touched.fundRaisingDuration && errors.fundRaisingDuration
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
               />
            </section>

            {/* Project Category */}
            <section>
               <Label htmlFor="category">Project Category</Label>
               <Select
                  id="category"
                  defaultValue=""
                  name="project_category"
                  error={touched.project_category && errors.project_category}
                  onChange={handleChange}
                  onBlur={handleBlur}
               >
                  <option value="" disabled>
                     Select Category
                  </option>
                  {CATEGORIES.map((category) => (
                     <option key={category} value={category}>
                        {category}
                     </option>
                  ))}
               </Select>
            </section>

            {/* Custom Project Category */}
            {values?.project_category === "Other" && (
               <section className="md:order-1">
                  <Label htmlFor="customCategory">Your Category</Label>
                  <Input
                     id="customCategory"
                     placeholder="Write your category"
                     name="customCategory"
                     error={touched.customCategory && errors.customCategory}
                     onChange={handleChange}
                     onBlur={handleBlur}
                  />
               </section>
            )}

            {/* Project Image */}
            <section>
               <div>
                  <Label htmlFor="image">Project Image</Label>
                  <Input
                     type="file"
                     accept="image/*"
                     id="image"
                     className="py-2.5 font-[300] text-[#A0AEC0] file:hidden"
                     name="projectImage"
                     onChange={(e) => {
                        handleImgChange(e, "projectImage");
                     }}
                     onBlur={handleBlur}
                     error={touched.projectImage && errors.projectImage}
                  />
               </div>

               {/* Project Image Preview */}
               <div className="mt-7 flex aspect-video items-center justify-center border">
                  {values?.projectImage ? (
                     <Image
                        src={URL.createObjectURL(values?.projectImage)}
                        alt="project"
                        width={800}
                        height={800}
                        className="aspect-video object-cover"
                     />
                  ) : (
                     <p className="text-sm font-[300]">Image Preview</p>
                  )}
               </div>
            </section>
         </div>

         {/* Is Project Pending */}
         <div className="flex items-center gap-2">
            <Checkbox
               id="isProjectPending"
               checked={isProjectPending}
               onChange={handleCheckboxChange}
            />
            <Label
               htmlFor="isProjectPending"
               className="mb-0 cursor-pointer font-normal sm:mb-0"
            >
               This is a Pending Project
            </Label>
         </div>
         <div>
            <Button
               variant="custom"
               className="!h-10 !px-5 text-[15px] font-[400]"
               loading={isSubmitting}
               type="submit"
            >
               Create
            </Button>
         </div>
      </form>
   );
}
