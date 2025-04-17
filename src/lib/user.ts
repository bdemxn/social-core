import type { SettingsProps } from "@/types/types"
import { authClient } from "./auth-client"

export async function updateUser(
	props: Partial<Pick<SettingsProps, "name" | "username">>,
) {
	try {
		const { data, error } = await authClient.updateUser({
			username: props.username,
			name: props.name,
		})

		if (error) throw error
		return data
	} catch (error) {
		throw Error.prototype.message
	}
}

export async function revokeOtherSessions() {
	try {
		const { data, error } = await authClient.revokeOtherSessions()

		if (error) throw error
		return data
	} catch (error) {
		throw Error.prototype.message
	}
}

export async function changePassword(
	currentPassword: string,
	newPassword: string,
) {
	try {
		const { data, error } = await authClient.changePassword({
			currentPassword,
			newPassword,
			revokeOtherSessions: true,
		})

		if (error) throw error
		return data
	} catch (error) {
		throw Error.prototype.name
	}
}
