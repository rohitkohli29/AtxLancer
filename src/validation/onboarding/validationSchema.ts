import { z } from "zod";
import country from '../../data/country.json'

//Auth validation
export const authValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).nonempty({message: "email must be required"}),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one digit" })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (@, $, !, %, *, ?, &)",
    }),
});

export type AuthSchema = z.infer<typeof authValidationSchema>;


export const freeLancerAboutSchema = z.object({
  description: z
    .string()
    .max(500, { message: "Description can't exceed 500 words." })
    .min(100, { message: "Description should be at least 100 words." })
    .nonempty({ message: "Description is required." }),

  title: z
    .string()
    .max(50, { message: "Title can't exceed 50 characters." })
    .min(10, { message: "Minimum length of title is 10 characters." })
    .nonempty({ message: "Title is required." }),

  gender: z.enum(["Male", "Female"], { message: "Invalid gender selected." }),

  dateOfBirth: z
    .string()
    .nonempty({ message: "Date of birth is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date of birth must be in the format YYYY-MM-DD.",
    }),

  hourlyRate: z
    .number({ invalid_type_error: "Hourly rate must be a number." })
    .min(1, { message: "Hourly rate must be at least 1" })
    .max(100, { message: "Hourly rate can't exceed 100." }),

  country: z.enum(country as [string, ...string[]], {
    message: "Invalid country selected.",
  }), // Use your JSON data here
});

export type FreeLancerAboutSchema = z.infer<typeof freeLancerAboutSchema>;
