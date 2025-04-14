import { nanoid } from "nanoid"
import { v4 as uuidv4 } from "uuid"

export function generateUUID(): string {
	return uuidv4()
}

export function generateShortId(): string {
	return nanoid(4)
}
