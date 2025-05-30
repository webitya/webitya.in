import { z } from "zod"
import { AppError } from "./AppError" // Assuming AppError is declared in a separate file

export const userRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
})

export const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters"),
  instructor: z.string().min(2, "Instructor name must be at least 2 characters"),
  price: z.number().min(0, "Price must be non-negative"),
  category: z.string().min(1, "Category is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
})

export const supportTicketSchema = z.object({
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  category: z.enum(["general", "technical", "billing", "course", "account"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
})

export const validateRequest = (schema) => {
  return (data) => {
    try {
      return schema.parse(data)
    } catch (error) {
      throw new AppError(`Validation error: ${error.errors.map((e) => e.message).join(", ")}`, 400)
    }
  }
}
