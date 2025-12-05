import * as yup from "yup";

const emailValidation = yup
  .string()
  .email("Invalid email address")
  .required("Email is required");

const passwordValidation = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password is too long")
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character.",
  })
  .required("Password is required");

const usernameValidation = yup
  .string()
  .min(5, "Username must be 5")
  .max(50, "Username is too long")
  .required("Username is required");

const confirmPasswordValidation = yup
  .string()
  .required("Confirm password is required")
  .oneOf([yup.ref("password")], "Passwords do not match");

// sign up schema
export const signUpFormSchema = yup.object().shape({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

export const loginFormSchema = yup.object().shape({
  email: emailValidation,
  password: yup.string().required("Password is required"),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password is too long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});


export const detoxSchema = yup.object({
  email: yup.string().email("Invalid email").optional(),
  foodTitle: yup.string().min(2, "Food title is required"),
  ingredients: yup
    .array(yup.string())
    .min(1, "Please add at least one ingredient"),
  type: yup.string().min(1, "Type is required"),
  description: yup.string().min(5, "Description is required"),
  weeklyList: yup.string().optional(),
  nutrition: yup.array(yup.string()).optional(),
  photo: yup.mixed().optional(),
});
