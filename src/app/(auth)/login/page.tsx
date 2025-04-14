"use client"

import GitHubIcon from "@/components/icons/github-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface User {
	username: string
	password: string
}

const UserSchema = z.object({
	username: z.string().min(3, "Username must be 3 characters at least"),
	password: z.string().min(8, "Password must be 8 characters at least"),
})

export default function LogIn() {
	return (
		<div>
			<section className="text-center">
				<p className="font-semibold text-lg">Welcome to Social Core</p>
				<p className="text-sm">Are you new? Let's start</p>
			</section>

			<LogInForm />
		</div>
	)
}

function LogInForm() {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>({
		resolver: zodResolver(UserSchema),
	})

	const onSubmit = (values: User) =>
		toast.promise(
			async () => {
				const { data, error } = await authClient.signIn.username({
					password: values.password,
					username: values.username,
				})

				if (error) throw error

				return data
			},
			{
				loading: "Login user...",
				success: (data) => {
					router.push("/feed")
					return `Welcome back, ${data.user.username}`
				},
				error: (error) => `Oopss, an error occurs: ${error.message}`,
			},
		)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
			<section className="flex flex-col gap-y-2">
				<div className="space-y-2">
					<div className="flex flex-col gap-y-1">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="bdemxn"
							{...register("username")}
						/>
						{errors.username && (
							<span className="text-red-500 text-sm">
								{errors.username.message}
							</span>
						)}
					</div>

					<div className="flex flex-col gap-y-1">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" {...register("password")} />
						{errors.password && (
							<span className="text-red-500 text-sm">
								{errors.password.message}
							</span>
						)}
					</div>
				</div>

				<Button type="submit">Log in</Button>
			</section>

			<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
				<span className="relative z-10 bg-background px-2 text-muted-foreground">
					Or
				</span>
			</div>

			<Button
				type="button"
				onClick={() => {
					toast.promise(
						async () => {
							await authClient.signIn.social({
								provider: "github",
							})
						},
						{
							loading: "Creating user...",
							error: (error) => `Oops, error: ${error}`,
						},
					)
				}}
			>
				Continue with Github <GitHubIcon />
			</Button>
		</form>
	)
}
