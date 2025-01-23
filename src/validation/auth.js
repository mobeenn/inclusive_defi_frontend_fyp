import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
   email: Yup.string().email("Invalid email").required("Please enter your email"),
   password: Yup.string().min(8).required("Please enter a password"),
   role: Yup.string().required("Please select a role"),
   terms: Yup.bool().oneOf([true], "Please accept terms and conditions"),
});

export const signinSchema = Yup.object().shape({
   email: Yup.string().email("Invalid email").required("Please enter your email"),
   password: Yup.string().required("Please enter your password"),
});

export const forgotPasswordSchema = Yup.object().shape({
   email: Yup.string().email("Invalid email").required("Please enter your email"),
});

export const resetPasswordSchema = Yup.object().shape({
   password: Yup.string().min(8).required("Please enter a password"),
   confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const changePasswordSchema = Yup.object().shape({
   oldPassword: Yup.string().required("Please enter your old password"),
   password: Yup.string().min(8).required("Please enter a new password"),
   confirmPassword: Yup.string()
      .required("Please confirm your new password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const updateProfileSchema = Yup.object().shape({
   name: Yup.string().required("Please enter your name"),
});
