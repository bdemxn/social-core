"use server"

import { db } from "@/config/db"
import { auth } from "@/lib/auth"
import { user } from "@/schemas"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"

export async function getProfileById(
	id: string,
): Promise<(typeof auth.$Infer.Session.user)[]> {
	try {
		const profileData = await db.select().from(user).where(eq(user.id, id))
		return profileData
	} catch (error) {
		throw Error.prototype.message
	}
}

export async function isMyAccount(id: string): Promise<boolean> {
	const session = await auth.api.getSession({
		headers: await headers(),
	})
	return session?.user.id === id
}

export async function accountRegistered() {
	const profiles = await db.select().from(user)
	return profiles
}