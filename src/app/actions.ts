"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const result = contactFormSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
        message: "Invalid form data.",
      };
    }

    // Simulate sending an email or saving to a database
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("New contact form submission:", result.data);

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
