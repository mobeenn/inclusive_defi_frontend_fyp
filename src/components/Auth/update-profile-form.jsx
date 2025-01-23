"use client";
import { useEffect } from "react";
import Input from "@/common/input";
import Label from "@/common/label";
import { Select, SelectOption } from "@/common/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BsFillCameraFill } from "react-icons/bs";
import { useFormik } from "formik";
import { toast } from "sonner";
import { updateProfileSchema } from "@/validation/auth";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/api/auth";

export default function UpdateProfileForm() {
   const router = useRouter();
   const user = useStore((state) => state.user);
   const setUser = useStore((state) => state.setUser);
   const canUploadDocuments =
      user?.kycStatus === "pending" || user?.kycStatus === "rejected";

   const initialValues = {
      name: user?.name,
      documentType: "nil",
      profileImg: null,
      passportImage: null,
      idFrontImage: null,
      idBackImage: null,
      licenseFrontImage: null,
      licenseBackImage: null,
   };

   const handleImgChange = (e, name) => {
      if (e.target.files && e.target.files[0]) {
         setFieldValue(name, e.currentTarget.files[0]);
      }
   };

   const {
      values,
      errors,
      touched,
      setFieldValue,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
      resetForm,
   } = useFormik({
      initialValues,
      validationSchema: updateProfileSchema,
      onSubmit,
   });

   async function onSubmit(values) {
      const {
         name,
         profileImg,
         passportImage,
         idFrontImage,
         idBackImage,
         licenseFrontImage,
         licenseBackImage,
         documentType,
      } = values;

      try {
         if (documentType === "nil" && canUploadDocuments) {
            toast.error("You need to upload documents to verify your KYC");
            return;
         }
         if (documentType === "passport" && !passportImage) {
            toast.error("Please upload your passport");
            return;
         }
         if (documentType === "idCard" && (!idFrontImage || !idBackImage)) {
            toast.error("Please upload your id card");
            return;
         }
         if (
            documentType === "license" &&
            (!licenseFrontImage || !licenseBackImage)
         ) {
            toast.error("Please upload your driving's license");
            return;
         }

         const formData = new FormData();

         formData.append("userId", user._id);
         if (name) {
            formData.append("name", name);
         }
         if (profileImg) {
            formData.append("profileImg", profileImg);
         }

         if (documentType === "passport" && passportImage) {
            formData.append("passportImage", passportImage);
         } else if (documentType === "idCard" && idFrontImage && idBackImage) {
            formData.append("idFrontImage", idFrontImage);
            formData.append("idBackImage", idBackImage);
         } else if (
            documentType === "license" &&
            licenseFrontImage &&
            licenseBackImage
         ) {
            formData.append("licenseFrontImage", licenseFrontImage);
            formData.append("licenseBackImage", licenseBackImage);
         }

         const res = await updateProfile(formData);

         if (canUploadDocuments) {
            router.push("/dashboard");
         }

         setUser(res?.data?.data);
         resetForm();
         toast.success(res?.data?.message);
      } catch (error) {
         console.log(error);
         toast.error(error?.response?.data?.message);
      }
   }

   // To clear out other documents fields on the change of document type
   useEffect(() => {
      const fieldsToClear = {
         passport: [
            "idFrontImage",
            "idBackImage",
            "licenseFrontImage",
            "licenseBackImage",
         ],
         idCard: ["passportImage", "licenseFrontImage", "licenseBackImage"],
         license: ["passportImage", "idFrontImage", "idBackImage"],
      };

      const clearFields = fieldsToClear[values?.documentType] || [];

      clearFields.forEach((field) => setFieldValue(field, ""));
   }, [values?.documentType, setFieldValue]);

   const profileImgPreview = values?.profileImg
      ? URL.createObjectURL(values.profileImg)
      : user?.profileImg && user.profileImg !== "null"
        ? user.profileImg
        : "/assets/images/temp-user-avatar.png";

   useEffect(() => {
      setFieldValue("name", user?.name);
   }, [user?.name, setFieldValue]);

   return (
      <form className="space-y-6" onSubmit={handleSubmit}>
         <section>
            <label className="mx-auto block size-[200px] cursor-pointer overflow-hidden rounded-full">
               <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  name="profileImg"
                  onChange={(e) => {
                     handleImgChange(e, "profileImg");
                  }}
                  onBlur={handleBlur}
               />
               <div className="group relative">
                  <Image
                     src={profileImgPreview}
                     alt="profile"
                     width={200}
                     height={200}
                     className="size-[200px] w-full rounded-full object-cover"
                  />
                  <div
                     className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center bg-gray-300/60 text-gray-800 opacity-0 transition-all group-hover:opacity-100",
                     )}
                  >
                     <BsFillCameraFill className="text-4xl" />
                  </div>
               </div>
            </label>
         </section>
         {/* Name */}
         <section>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
               id="fullName"
               placeholder="Enter your full name"
               name="name"
               value={values?.name}
               error={touched.name && errors.name}
               onChange={handleChange}
               onBlur={handleBlur}
            />
         </section>
         <section>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" readOnly value={user?.email} />
         </section>
         {user && canUploadDocuments && (
            /* Documents Selection */
            <section>
               <Label htmlFor="documents">Upload Documents</Label>
               <Select
                  id="documents"
                  name="documentType"
                  value={values?.documentType}
                  onChange={handleChange}
                  onBlur={handleBlur}
               >
                  <SelectOption value="nil" disabled>
                     Choose one
                  </SelectOption>
                  <SelectOption value="passport">Passport</SelectOption>
                  <SelectOption value="license">
                     Driver&apos;s License
                  </SelectOption>
                  <SelectOption value="idCard">Identity Card</SelectOption>
               </Select>
            </section>
         )}
         {/* Passport Input */}
         {values?.documentType === "passport" && (
            <div className="flex flex-col gap-x-3 gap-y-6 sm:flex-row">
               <section>
                  <Label htmlFor="profilePicture">Passport</Label>
                  <Input
                     type="file"
                     accept="image/*"
                     id="passport"
                     className="cursor-pointer py-2.5 font-[300] text-[#A0AEC0] file:hidden"
                     name="passportImage"
                     onChange={(e) => {
                        handleImgChange(e, "passportImage");
                     }}
                     onBlur={handleBlur}
                  />
               </section>
               <section className="flex h-[200px] items-center justify-center border border-[#F0F3F7] sm:flex-1">
                  {values?.passportImage ? (
                     <Image
                        src={URL.createObjectURL(values?.passportImage)}
                        alt="passport"
                        width={200}
                        height={200}
                     />
                  ) : (
                     <p className="text-sm font-[300]">Image Preview</p>
                  )}
               </section>
            </div>
         )}
         {/* Driver's License Input */}
         {values?.documentType === "license" && (
            <div className="flex flex-col gap-x-3 gap-y-6 sm:flex-row">
               <div>
                  <section className="mb-5">
                     <Label htmlFor="licenseFront">
                        Driver&apos;s License (Front Side)
                     </Label>
                     <Input
                        type="file"
                        accept="image/*"
                        id="licenseFront"
                        className="cursor-pointer py-2.5 font-[300] text-[#A0AEC0] file:hidden"
                        name="licenseFrontImage"
                        onChange={(e) => {
                           handleImgChange(e, "licenseFrontImage");
                        }}
                        onBlur={handleBlur}
                     />
                  </section>
                  <section className="flex h-[200px] flex-1 items-center justify-center border border-[#F0F3F7]">
                     {values?.licenseFrontImage ? (
                        <Image
                           src={URL.createObjectURL(values?.licenseFrontImage)}
                           alt="idFront"
                           width={200}
                           height={200}
                        />
                     ) : (
                        <p className="text-sm font-[300]">Image Preview</p>
                     )}
                  </section>
               </div>
               <div>
                  <section className="mb-5">
                     <Label htmlFor="licenseBack">
                        Driver&apos;s License (Back Side)
                     </Label>
                     <Input
                        type="file"
                        accept="image/*"
                        id="licenseBack"
                        className="cursor-pointer py-2.5 font-[300] text-[#A0AEC0] file:hidden"
                        name="licenseBackImage"
                        onChange={(e) => {
                           handleImgChange(e, "licenseBackImage");
                        }}
                        onBlur={handleBlur}
                     />
                  </section>
                  <section className="flex h-[200px] flex-1 items-center justify-center border border-[#F0F3F7]">
                     {values?.licenseBackImage ? (
                        <Image
                           src={URL.createObjectURL(values?.licenseBackImage)}
                           alt="idBack"
                           width={200}
                           height={200}
                        />
                     ) : (
                        <p className="text-sm font-[300]">Image Preview</p>
                     )}
                  </section>
               </div>
            </div>
         )}

         {/* Id Card Input */}
         {values?.documentType === "idCard" && (
            <div className="flex flex-col gap-x-3 gap-y-6 sm:flex-row">
               <div>
                  <section className="mb-5">
                     <Label htmlFor="idFront">Identity Card (Front Side)</Label>
                     <Input
                        type="file"
                        accept="image/*"
                        id="idFront"
                        className="cursor-pointer py-2.5 font-[300] text-[#A0AEC0] file:hidden"
                        name="idFrontImage"
                        onChange={(e) => {
                           handleImgChange(e, "idFrontImage");
                        }}
                        onBlur={handleBlur}
                     />
                  </section>
                  <section className="flex h-[200px] flex-1 items-center justify-center border border-[#F0F3F7]">
                     {values?.idFrontImage ? (
                        <Image
                           src={URL.createObjectURL(values?.idFrontImage)}
                           alt="idFront"
                           width={200}
                           height={200}
                        />
                     ) : (
                        <p className="text-sm font-[300]">Image Preview</p>
                     )}
                  </section>
               </div>
               <div>
                  <section className="mb-5">
                     <Label htmlFor="idBack">Identity Card (Back Side)</Label>
                     <Input
                        type="file"
                        accept="image/*"
                        id="idBack"
                        className="cursor-pointer py-2.5 font-[300] text-[#A0AEC0] file:hidden"
                        name="idBackImage"
                        onChange={(e) => {
                           handleImgChange(e, "idBackImage");
                        }}
                        onBlur={handleBlur}
                     />
                  </section>
                  <section className="flex h-[200px] flex-1 items-center justify-center border border-[#F0F3F7]">
                     {values?.idBackImage ? (
                        <Image
                           src={URL.createObjectURL(values?.idBackImage)}
                           alt="idBack"
                           width={200}
                           height={200}
                        />
                     ) : (
                        <p className="text-sm font-[300]">Image Preview</p>
                     )}
                  </section>
               </div>
            </div>
         )}
         <section>
            <Button
               type="submit"
               variant="custom"
               className="mt-3 font-[400]"
               loading={isSubmitting}
            >
               update
            </Button>
         </section>
      </form>
   );
}
