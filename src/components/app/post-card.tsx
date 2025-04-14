import type { Post } from "@/types/types"
import Link from "next/link"

export function PostCard({ user, createdAt, content }: Post) {
	return (
		<div className="w-full border border-neutral-200 p-2">
			<div className="flex justify-between">
				<div className="flex items-center gap-x-1">
					<Link
						className="text-blue-500 font-semibold"
						href={`/profile/${user?.id}`}
					>
						{user?.name}
					</Link>
					<span className="text-xs text-neutral-400">@{user?.username}</span>
				</div>

				<span className="text-sm">{createdAt.toLocaleString()}</span>
			</div>

			<p>{content}</p>
		</div>
	)
}
