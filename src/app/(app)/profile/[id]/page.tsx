import { getPostsByUserId } from "@/actions/posts-actions"
import { getProfileById } from "@/actions/profile-actions"
import { Appbar } from "@/components/app/appbar"
import { PostCard } from "@/components/app/post-card"
import { SettingsBar } from "@/components/app/settings-bar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

type ProfileSlug = {
	params: Promise<{ id: string }>
}

export default async function Profile({ params }: ProfileSlug) {
	const { id } = await params
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	const profileData = await getProfileById(id)
	const postsByUser = await getPostsByUserId(id)

	return (
		<>
			<Appbar name="Profile" />

			<section className="mt-3">
				<div className="md:flex justify-between items-center">
					<div>
						<div className="flex gap-x-1 items-center">
							<span>{profileData[0].name}</span>
							<span className="text-sm text-neutral-400">
								@{profileData[0].username}
							</span>
						</div>

						<div className="flex gap-x-4 items-center">
							<span className="text-sm">{postsByUser.length} Posts</span>
							<span className="text-xs md:text-sm">
								Account created at {profileData[0].createdAt.toLocaleString()}
							</span>
						</div>
					</div>

					{session?.user.id === id && <SettingsBar />}
				</div>
			</section>

			<section className="space-y-2 mt-10">
				{postsByUser.map((post) => (
					<PostCard
						key={post.id}
						content={post.content}
						createdAt={post.createdAt}
						id={post.id}
						user={post.user}
					/>
				))}
			</section>
		</>
	)
}
