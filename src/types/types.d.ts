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

export type UserUpdateProps = {
	username: string
	image: string
	displayname: string
	name: string
}

export type SettingsProps = {
	username: string
	name: string
	currentPassword: string
	newPassword: string
}
