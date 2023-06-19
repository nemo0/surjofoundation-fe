import { z } from "zod";

export const studentSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  guardianName: z.string().nonempty("Guardian name is required"),
  gender: z.string().nonempty("Gender is required"),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
  caste: z.string().nonempty("Caste is required"),
  religion: z.string().nonempty("Religion is required"),
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
  highestQualification: z
    .string()
    .nonempty("Highest qualification is required"),
  course: z.string().nonempty("Course is required"),
  file: z.any().optional(),
});

export const courseSchema = z.object({
  courseName: z.string().nonempty("Course name is required"),
  courseDuration: z.string().nonempty("Course duration is required"),
  courseDescription: z.string().nonempty("Course description is required"),
  courseCode: z.string().nonempty("Course code is required"),
});
