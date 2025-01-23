import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
   email: Yup.string().email("Invalid email").required("Email is required"),
   subject: Yup.string().required("Subject is required"),
   message: Yup.string().required("Message is required"),
});
