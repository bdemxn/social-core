"use server"

import { db } from "@/config/db"
import { auth } from "@/lib/auth"
import { post, user } from "@/schemas"
import { desc, eq } from "drizzle-orm"
import { headers } from "next/headers"

export async function createPost(content: string) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		})

		if (!session) throw "User not authenticated"

		await db.insert(post).values({
			userId: session.user.id,
			content,
			createdAt: new Date(),
		})
	} catch (err) {
		throw Error.prototype.message
	}
}

export async function getAllPosts() {
	try {
		const posts = await db
			.select({
				id: post.id,
				content: post.content,
				createdAt: post.createdAt,
				user: {
					id: user.id,
					name: user.name,
					username: user.username,
					displayname: user.displayUsername,
				},
			})
			.from(post)
			.innerJoin(user, eq(post.userId, user.id))
			.orderBy(desc(post.createdAt))

		return posts
	} catch (err) {
		throw Error.prototype.message
	}
}

export async function getPostsByUserId(userId: string) {
	try {
		const posts = await db
			.select({
				id: post.id,
				content: post.content,
				createdAt: post.createdAt,
				user: {
					id: user.id,
					name: user.name,
					username: user.username,
					displayname: user.displayUsername,
				},
			})
			.from(post)
			.where(eq(post.userId, userId))
			.innerJoin(user, eq(post.userId, user.id))
			.orderBy(desc(post.createdAt))

		return posts
	} catch (error) {
		throw Error.prototype.message
	}
}
