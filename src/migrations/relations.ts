import { relations } from "drizzle-orm/relations";
import { user, account, session, comments, post, likes, profile } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	comments: many(comments),
	posts: many(post),
	profiles_displayName: many(profile, {
		relationName: "profile_displayName_user_username"
	}),
	profiles_displayName: many(profile, {
		relationName: "profile_displayName_user_displayUsername"
	}),
	profiles_userId: many(profile, {
		relationName: "profile_userId_user_id"
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	user: one(user, {
		fields: [comments.userId],
		references: [user.id]
	}),
	post: one(post, {
		fields: [comments.postId],
		references: [post.id]
	}),
}));

export const postRelations = relations(post, ({one, many}) => ({
	comments: many(comments),
	likes: many(likes),
	user: one(user, {
		fields: [post.userId],
		references: [user.id]
	}),
}));

export const likesRelations = relations(likes, ({one}) => ({
	post: one(post, {
		fields: [likes.postId],
		references: [post.id]
	}),
}));

export const profileRelations = relations(profile, ({one}) => ({
	user_displayName: one(user, {
		fields: [profile.displayName],
		references: [user.username],
		relationName: "profile_displayName_user_username"
	}),
	user_displayName: one(user, {
		fields: [profile.displayName],
		references: [user.displayUsername],
		relationName: "profile_displayName_user_displayUsername"
	}),
	user_userId: one(user, {
		fields: [profile.userId],
		references: [user.id],
		relationName: "profile_userId_user_id"
	}),
}));