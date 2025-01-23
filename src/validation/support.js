import * as Yup from "yup";

export const newTicketSchema = Yup.object().shape({
   subject: Yup.string().required("Please enter your subject"),
   message: Yup.string().required("Please enter your message"),
});
