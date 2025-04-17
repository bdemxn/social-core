import type { Post } from "@/types/types"
import Link from "next/link"

export function PostCard({ user, createdAt, content }: Post) {
	return (
		<div className="w-full border border-neutral-200 dark:border-white/20 p-2">
			<div className="md:flex justify-between">
				<div className="flex items-center gap-x-1">
					<Link
						className="text-blue-500 dark:text-blue-300 font-semibold"
						href={`/profile/${user?.id}`}
					>
						{user?.name}
					</Link>
					<span className="text-xs text-neutral-400">@{user?.username}</span>
				</div>

				<span className="text-xs md:text-sm">{createdAt.toLocaleString()}</span>
			</div>

			<p>{content}</p>
		</div>
	)
}
