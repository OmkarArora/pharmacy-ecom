import { z } from "zod";

// Define the validation schema using Zod
export const LOGIN_SCHEMA = z.object({
	username: z
		.string()
		// .email("Invalid email address")
		.min(5, "Email is required"),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter.",
		})
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter.",
		})
		.regex(/[0-9]/, { message: "Password must contain at least one number." })
		.regex(/[^a-zA-Z0-9\s]/, {
			message: "Password must contain at least one symbol.",
		}),
});
