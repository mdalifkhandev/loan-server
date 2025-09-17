import z from "zod";

const authValidationSchema = z.object({
  body: z.object({
     phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number too long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  role: z.enum(["user", "lender", "admin"]).default("user"),
  isDeleted: z.boolean().default(false),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
  }),
});

export const AuthValidation = {
  authValidationSchema,
};