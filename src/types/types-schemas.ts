import { z } from "zod"

export const PostSchema = z.object({
	content: z.string().min(1, "Post must be 1 character at least").max(200),
})
