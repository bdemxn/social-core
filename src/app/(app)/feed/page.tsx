"use client"

import { getAllPosts } from "@/actions/posts-actions"
import { Appbar } from "@/components/app/appbar"
import { PostCard } from "@/components/app/post-card"
import useSWR from "swr"

export default function Feed() {
	const { data, isLoading } = useSWR("posts", getAllPosts)

	return (
		<>
			<Appbar name="Feed" />
			<div className="mt-10 space-y-3">
				{isLoading ? (
					<div>Loading posts...</div>
				) : (
					data?.map((post) => (
						<PostCard
							content={post.content}
							createdAt={post.createdAt}
							user={post.user}
							id={post.id}
							key={post.id}
						/>
					))
				)}
			</div>
		</>
	)
}
