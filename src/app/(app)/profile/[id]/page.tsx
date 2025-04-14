import { getPostsByUserId } from "@/actions/posts-actions"
import { getProfileById } from "@/actions/profile-actions"

type ProfileSlug = {
	params: Promise<{ id: string }>
}

export default async function Profile({ params }: ProfileSlug) {
	const { id } = await params

	const profileData = await getProfileById(id)
	const postsByUser = await getPostsByUserId(id)

	console.log(profileData)
	console.log(postsByUser)

	return <div>Profile: {id}</div>
}
