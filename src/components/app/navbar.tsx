"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { authClient } from "@/lib/auth-client"
import { ArrowUpRightIcon } from "lucide-react"

export default function Navbar() {
	const router = useRouter()
	const { data } = authClient.useSession()
	const isLogged: boolean = Boolean(data?.user.id)

	return (
		<nav className="border-b border-neutral-200 dark:border-white/20 w-full">
			<section className="md:w-[800px] mx-auto flex items-center justify-between p-2">
				<span>Social Core</span>

				{
					isLogged ? (
						<Button onClick={() => router.push("/feed")}>My Feed<ArrowUpRightIcon /></Button>
					) : (
						<div className="flex gap-x-2">
							<Button onClick={() => router.push("/login")} variant="ghost">
								Login
							</Button>
							<Button onClick={() => router.push("/register")}>Register</Button>
						</div>
					)
				}
			</section>
		</nav >
	)
}
