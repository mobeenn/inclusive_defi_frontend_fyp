"use client";
import { editProject } from "@/api/projects";
import Checkbox from "@/common/checkbox";
import Input from "@/common/input";
import Label from "@/common/label";
import { Select } from "@/common/select";
import Textarea from "@/common/textarea";
import { Button } from "@/components/ui/button";
import { useGetProjectById } from "@/data/projects";
import { editProjectSchema } from "@/validation/project";
import { useCrowdFunding } from "@/web3/providers/crowd-funding-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

export default function EditProjectForm({ id }) {
   const router = useRouter();
   const { address } = useAccount();
   const queryClient = useQueryClient();
   const { updateWeb3Project } = useCrowdFunding();

   const { data: project } = useGetProjectById(id);

   const [isProjectPending, setIsProjectPending] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const handleCheckboxChange = (event) => {
      setIsProjectPending(event.target.checked);
   };

   const initialValues = {
      projectTitle: project?.projectTitle,
      fundNeeded: project?.fundNeeded,
      projectDescription: project?.projectDescription,
      totalSupply: project?.totalSupply,
      tokenIdoPrice: project?.tokenIdoPrice,
      fundRaisingDuration: project?.fundRaisingDuration,
      project_category: CATEGORIES.includes(project?.project_category)
         ? project?.project_category
         : "Other",
      customCategory: project?.project_category,
      projectImage: null,
   };

   const {
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue,
      resetForm,
   } = useFormik({
      initialValues,
      validationSchema: editProjectSchema,
      enableReinitialize: true,
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
      try {
         setIsLoading(true);
         const formData = new FormData();

         formData.append("projectId", project?._id);
         formData.append("projectTitle", values.projectTitle);
         formData.append("fundNeeded", values.fundNeeded);
         formData.append("projectDescription", values.projectDescription);
         formData.append("totalSupply", values.totalSupply);
         formData.append("tokenIdoPrice", values.tokenIdoPrice);
         formData.append("fundRaisingDuration", values.fundRaisingDuration);

         if (isProjectPending) {
            formData.append("projectStatus", "pending");
         } else {
            formData.append("projectStatus", "active");
         }

         if (values.projectImage || project?.projectImage) {
            formData.append("projectImage", values.projectImage);
         }

         if (values.project_category === "Other") {
            formData.append("project_category", values.customCategory);
         } else {
            formData.append("project_category", values.project_category);
         }

         // Update project in the contract
         if (
            +project?.fundRaisingDuration !== +values.fundRaisingDuration ||
            +project?.fundNeeded !== +values.fundNeeded
         ) {
            if (!address) {
               toast.error("Please connect your wallet");
               return;
            }

            const creationDate = new Date(project?.createdAt).getTime();
            const durationInDays = values?.fundRaisingDuration;
            const endDate = creationDate + durationInDays * 24 * 60 * 60 * 1000;

            const contractRes = await updateWeb3Project(
               Number(values.fundNeeded),
               endDate,
               project?._id,
            );

            if (!contractRes.transactionHash) {
               toast.error("Something went wrong!");
               return;
            }
         }

         // Update project in the backend
         const res = await editProject(formData);
         toast.success(res?.data?.message);

         queryClient.invalidateQueries({ queryKey: ["project", id] });
         queryClient.refetchQueries({ queryKey: ["project", id] });

         router.push("/dashboard/projects");
         resetForm();
      } catch (error) {
         if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
         } else {
            toast.error("Something went wrong");
         }
      } finally {
         setIsLoading(false);
      }
   }

   function outputFormData(formData) {
      formData.forEach((value, key) => {
         console.log(`${key}: ${value}`);
      });
   }

   function handleImgChange(e, name) {
      if (e.target.files && e.target.files[0]) {
         setFieldValue(name, e.currentTarget.files[0]);
      }
   }

   let imagePreview = null;
   if (values?.projectImage) {
      imagePreview = URL.createObjectURL(values?.projectImage);
   } else if (project?.projectImage) {
      imagePreview = project?.projectImage;
   }

   useEffect(() => {
      setIsProjectPending(project?.projectStatus == "active" ? false : true);
   }, [project, setFieldValue]);

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
                  value={values.projectTitle}
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
                  value={values.fundNeeded}
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
               value={values.projectDescription}
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
                  value={values.totalSupply}
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
                  value={values.tokenIdoPrice}
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
                  type="number"
                  placeholder="Write fund collecting duration in Days i.e 25"
                  name="fundRaisingDuration"
                  value={values.fundRaisingDuration}
                  error={
                     touched.fundRaisingDuration && errors.fundRaisingDuration
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  allowDecimal={false}
               />
            </section>

            {/* Project Category */}
            <section>
               <Label htmlFor="category">Project Category</Label>
               <Select
                  id="category"
                  value={values?.project_category}
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
                     value={values.customCategory}
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
                     error={
                        touched.projectImage &&
                        !project?.projectImage &&
                        errors.projectImage &&
                        !project?.projectImage
                     }
                  />
               </div>

               {/* Project Image Preview */}
               <div className="mt-7 flex aspect-video items-center justify-center border">
                  {values?.projectImage || project?.projectImage ? (
                     <Image
                        src={imagePreview || project?.projectImage}
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
               type="submit"
               loading={isLoading}
            >
               Update
            </Button>
         </div>
      </form>
   );
}
