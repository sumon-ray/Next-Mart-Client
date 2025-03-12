import { z } from "zod";

export const registrationSchema = z.object({
    name: z.string({required_error: "First Name is required"})
    .min(2, "First name must be between 2 and 50 characters")
    .max(50, "First name must be between 2 and 50 characters"),


    email: z.string({required_error: "Email is required"})
    .email("Invalid Email Address"),
    password: z.string({required_error: "Password confirmation is required"})
    .min(8, "password must be at least 8 characters"),
    passwordConfirm: z.string({required_error: "Password is required"})
    .min(1)
})