export const IS_DEV = Boolean(process.env.NODE_ENV === "development")

export const config = {
	DATABASE_URL: process.env.DATABASE_URL as string,
	AUTH_TOKEN: process.env.AUTH_TOKEN as string,
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
}
