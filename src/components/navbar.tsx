"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export default function Navbar() {
	const router = useRouter()

	return (
		<nav className="border-b border-neutral-200 w-full">
			<section className="w-[800px] mx-auto flex items-center justify-between p-2">
				<span>Social Core</span>

				<div className="flex gap-x-2">
					<Button onClick={() => router.push("/login")} variant="ghost">
						Login
					</Button>
					<Button onClick={() => router.push("/register")}>Register</Button>
				</div>
			</section>
		</nav>
	)
}
