import { generateUUID } from "@/lib/uuid"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { user } from "./auth-schema"

export const profile = sqliteTable("profile", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => generateUUID()),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	posts: integer("posts").notNull().default(0),
})
