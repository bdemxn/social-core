"use client"

import { changePassword, revokeOtherSessions, updateUser } from "@/lib/user"
import type { SettingsProps } from "@/types/types"
import { ChangePasswordSchema, UpdateUserSchema } from "@/types/types-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { BoltIcon, Trash2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet"

export function SettingsBar() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" className="mt-4 md:mt-0">
					<BoltIcon />
					Modify profile
				</Button>
			</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you're done.
					</SheetDescription>
				</SheetHeader>

				<Separator />

				<ProfileSettings />

				<PasswordSettings />

				<SheetFooter>
					<SheetClose asChild>
						<Button
							onClick={() =>
								toast.promise(revokeOtherSessions(), {
									success: "Excellent, other sessions have been revoked✨",
									loading: "Revoking sessions...",
									error: (error) => `Oops: ${error.message}`,
								})
							}
							type="button"
							variant="destructive"
						>
							<Trash2Icon />
							Revoke other sessions
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

function ProfileSettings() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Partial<Pick<SettingsProps, "name" | "username">>>({
		resolver: zodResolver(UpdateUserSchema),
	})

	const onSubmit = (
		values: Partial<Pick<SettingsProps, "name" | "username">>,
	) => {
		const filteredValues = Object.fromEntries(
			Object.entries(values).filter(([_, v]) => v !== ""),
		)
		const escapeEvent = new KeyboardEvent("keydown", {
			key: "Escape",
			code: "Escape",
			bubbles: true,
		})

		toast.promise(updateUser(filteredValues), {
			success: () => {
				document.dispatchEvent(escapeEvent)
				return "Profile has been updated⚡"
			},
			loading: "Crafting new profile preferences...",
			error: (error) => `Oops: ${error.message}`,
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-4 p-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="username" className="text-right text-xs md:text-base">
						Username
					</Label>
					<Input
						id="username"
						className="col-span-3"
						placeholder="bdx.gg"
						{...register("username")}
					/>
					{errors.username && (
						<span className="col-span-4 text-sm text-red-500">
							{errors.username.message}
						</span>
					)}
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="name" className="text-right text-xs md:text-base">
						Name
					</Label>
					<Input
						id="name"
						className="col-span-3"
						placeholder="Kevin Bonilla"
						{...register("name")}
					/>
					{errors.name && (
						<span className="col-span-4 text-sm text-red-500">
							{errors.name.message}
						</span>
					)}
				</div>

				<Button>Save Profile Settings</Button>
			</div>
		</form>
	)
}

function PasswordSettings() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Pick<SettingsProps, "currentPassword" | "newPassword">>({
		resolver: zodResolver(ChangePasswordSchema),
	})

	const onSubmit = (
		values: Pick<SettingsProps, "currentPassword" | "newPassword">,
	) => {
		toast.promise(changePassword(values.currentPassword, values.newPassword), {
			success: "Profile has been updated⚡",
			loading: "Changing the password...⚒",
			error: (error) => `Oops: ${error.message}`,
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-4 p-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="current-password"
						className="text-right text-xs md:text-base"
					>
						Current Password
					</Label>
					<Input
						id="current-password"
						className="col-span-3"
						type="password"
						{...register("currentPassword")}
					/>
					{errors.currentPassword && (
						<span className="col-span-4 text-sm text-red-500">
							{errors.currentPassword.message}
						</span>
					)}
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="new-password"
						className="text-right text-xs md:text-base"
					>
						New Password
					</Label>
					<Input
						id="new-password"
						className="col-span-3"
						type="password"
						{...register("newPassword")}
					/>
					{errors.newPassword && (
						<span className="col-span-4 text-sm text-red-500">
							{errors.newPassword.message}
						</span>
					)}
				</div>

				<Button type="submit">Change Password</Button>
			</div>
		</form>
	)
}
