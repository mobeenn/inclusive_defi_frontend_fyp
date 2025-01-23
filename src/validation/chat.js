import * as yup from "yup";

export const newMeetingSchema = yup.object().shape({
   topic: yup.string().required("Topic is required"),
   duration: yup.string().required("Duration is required"),
   startTime: yup.string().required("Start time is required"),
});
