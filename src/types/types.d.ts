import type { auth } from "@/lib/auth"

export type Post = {
	id: string
	user: Pick<
		typeof auth.$Infer.Session.user,
		"id" | "name" | "username" | "displayUsername"
	> | null
	content: string
	createdAt: Date
}
