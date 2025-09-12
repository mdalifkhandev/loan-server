import z from "zod";

// User registration/login validation schema
const authValidationSchema = z.object({
  body: z.object({
    firstName: z
      .string({ message: "First name is required" })
      .min(3, { message: "Too short, minimum 3 characters" })
      .max(10, { message: "Too long, maximum 10 characters" }),
    lastName: z
      .string({ message: "Last name is required" })
      .min(3, { message: "Too short, minimum 3 characters" })
      .max(10, { message: "Too long, maximum 10 characters" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ message: "Password is required" }),
    role: z
      .enum(["admin", "user","lender"])
      .default("user"),
    isDeleted: z
      .boolean()
      .default(false),
    phone: z
      .number()
      .optional(),
    streetAddress: z
      .string()
      .optional(),
    city: z
      .string()
      .optional(),
    state: z
      .string()
      .optional(),
    zipCode: z
      .string()
      .optional(),
  }),
});

export const AuthValidation = {
  authValidationSchema,
};