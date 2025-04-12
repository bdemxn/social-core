import { generateShortId, generateUUID } from "@/lib/uuid"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { user } from "./auth-schema"

export const post = sqliteTable("post", {
  id: text("id").primaryKey().$defaultFn(() => generateUUID()),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

export const likes = sqliteTable("likes", {
  id: text("id").primaryKey().$defaultFn(() => generateShortId()),
  postId: text("post_id").notNull().references(() => post.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

export const comments = sqliteTable("comments", {
  id: text("id").primaryKey().$defaultFn(() => generateShortId()),
  postId: text("post_id").notNull().references(() => post.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})