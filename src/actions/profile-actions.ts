"use server"

import { db } from "@/config/db"
import { user } from "@/schemas"
import { eq } from "drizzle-orm"

export async function getProfileById(id: string) {
	try {
		const profileData = await db.select().from(user).where(eq(user.id, id))
		return profileData
	} catch (error) {
		throw Error.prototype.message
	}
}
