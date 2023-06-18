import { z } from "zod";

export const studentSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  guardianName: z.string().nonempty("Guardian name is required"),
  aadhaarNumber: z
    .string()
    .regex(
      /^\d{4} \d{4} \d{4}$/,
      "Aadhaar number must be in the format XXXX XXXX XXXX"
    )
    .nonempty("Aadhaar number is required"),
  contactNumber: z
    .string()
    .max(10, "Contact number cannot exceed 10 digits")
    .nonempty("Contact number is required"),
  address: z.string().nonempty("Address is required"),
  course: z.string().nonempty("Course is required"),
  file: z.any().optional(),
});
