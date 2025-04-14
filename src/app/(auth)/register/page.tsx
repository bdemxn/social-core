"use client"

import GitHubIcon from "@/components/icons/github-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface User {
	username: string
	fullname: string
	password: string
	email: string
}

const UserSchema = z.object({
	username: z.string().min(3, "Username must be 3 characters at least"),
	fullname: z.string().min(1, "Name must be 1 character at least"),
	password: z.string().min(8, "Password must be 8 characters at least"),
	email: z.string().email("Invalid email"),
})

export default function Register() {
	return (
		<div>
			<section className="text-center">
				<p className="font-semibold text-lg">Welcome to Social Core</p>
				<p className="text-sm">Are you new? Let's start</p>
			</section>

			<RegisterForm />
		</div>
	)
}

function RegisterForm() {
	const router = useRouter()
	const [step, setStep] = useState<number>(1)

	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm<User>({
		resolver: zodResolver(UserSchema),
	})

	const onSubmit = (values: User) =>
		toast.promise(
			async () => {
				const { data, error } = await authClient.signUp.email({
					email: values.email,
					name: values.fullname,
					password: values.password,
					username: values.username,
				})

				if (error) throw error

				return data
			},
			{
				loading: "Creating user...",
				success: () => {
					router.push("/feed")
					return "User has been successfully created"
				},
				error: (error) => `Oopss, an error occurs: ${error.message}`,
			},
		)

	const handleNext = async () => {
		const valid = await trigger(["email", "fullname"])
		if (valid) setStep(2)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
			{step === 1 && (
				<section className="flex flex-col gap-y-2">
					<div className="space-y-2">
						<div className="flex flex-col gap-y-1">
							<Label htmlFor="fullname">Name</Label>
							<Input
								id="fullname"
								type="text"
								placeholder="Kevin Bonilla"
								{...register("fullname")}
							/>
							{errors.fullname && (
								<span className="text-red-500 text-sm">
									{errors.fullname.message}
								</span>
							)}
						</div>

						<div className="flex flex-col gap-y-1">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="kevinb@social.core"
								{...register("email")}
							/>
							{errors.email && (
								<span className="text-red-500 text-sm">
									{errors.email.message}
								</span>
							)}
						</div>
					</div>

					<Button type="button" onClick={handleNext}>
						Next
					</Button>
				</section>
			)}
			{step === 2 && (
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

					<Button type="submit">Register</Button>
				</section>
			)}

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
