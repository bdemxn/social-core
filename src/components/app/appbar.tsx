"use client"

import { authClient } from "@/lib/auth-client"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ModeToggle } from "./dark-mode"
import { CreatePost } from "./post-form"

type AppbarProps = {
	name: string
}

export function Appbar(props: AppbarProps) {
	const router = useRouter()
	const { data: userData } = authClient.useSession()

	function getInitialForUsers(): string {
		const fullname = userData?.user.name
		if (!fullname) return ":)"

		const initials = fullname?.split(" ")
		return initials[0][0] + initials[1][0]
	}

	return (
		<div className="backdrop-blur-md sticky top-0 p-2 flex justify-between items-center gap-x-3">
			<span className="font-semibold">{props.name}</span>

			{userData?.session.token ? (
				<div className="flex gap-x-3 items-center">
					<CreatePost />
					<Popover>
						<PopoverTrigger asChild>
							<Avatar>
								<AvatarImage />
								<AvatarFallback>{getInitialForUsers()}</AvatarFallback>
							</Avatar>
						</PopoverTrigger>

						<PopoverContent>
							<div className="flex flex-col w-full gap-y-2">
								<div className="text-sm flex flex-col gap-x-1">
									<span>{userData?.user.name}</span>
									<span className="text-neutral-400">
										@{userData?.user.username}
									</span>
								</div>

								<Button
									variant="secondary"
									onClick={() => router.push(`/profile/${userData?.user.id}`)}
									size="sm"
								>
									Go to profile
								</Button>

								<Button
									variant="secondary"
									onClick={() => authClient.signOut()}
									size="sm"
								>
									<LogOutIcon />
									Log out
								</Button>
							</div>
						</PopoverContent>
					</Popover>
					<ModeToggle />
				</div>
			) : (
				<Button onClick={() => router.push("/login")}>Login</Button>
			)}
		</div>
	)
}
