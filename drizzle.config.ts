import { config } from "@/config/env"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
	dialect: "turso",
	schema: "./src/schemas/index.ts",
	out: "./src/migrations",

	dbCredentials: {
		url: config.DATABASE_URL,
		authToken: config.AUTH_TOKEN,
	},
})
