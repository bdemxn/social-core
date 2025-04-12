import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import { config } from "./env"
import * as schema from "@/schemas/index"

const { AUTH_TOKEN, DATABASE_URL } = config

const client = createClient({
	url: DATABASE_URL,
	authToken: AUTH_TOKEN,
})
export const db = drizzle({ client, schema })
