import { z } from "zod"

export const PostSchema = z.object({
	content: z.string().min(1, "Post must be 1 character at least").max(200),
})

export const UpdateUserSchema = z
	.object({
		username: z.string().min(3).max(20).optional().or(z.literal("")),
		name: z.string().min(3).max(50).optional().or(z.literal("")),
	})
	.refine((data) => data.username || data.name, {
		message: "Must change one input at least",
		path: ["name"],
	})

export const ChangePasswordSchema = z.object({
	currentPassword: z.string().min(8, "Password must be 8 characters at least"),
	newPassword: z.string().min(8, "New password must be 8 characters at least"),
})
