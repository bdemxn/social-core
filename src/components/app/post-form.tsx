import { createPost } from "@/actions/posts-actions"
import type { Post } from "@/types/types"
import { PostSchema } from "@/types/types-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { mutate } from "swr"
import { Button } from "../ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog"
import { Textarea } from "../ui/textarea"

export function CreatePost() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Create Post</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new post</DialogTitle>
					<DialogDescription>What do you think about?</DialogDescription>
				</DialogHeader>

				<PostForm />
			</DialogContent>
		</Dialog>
	)
}

export function PostForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Pick<Post, "content">>({
		resolver: zodResolver(PostSchema),
	})

	const escapeEvent = new KeyboardEvent("keydown", {
		key: "Escape",
		code: "Escape",
		bubbles: true,
	})

	const onSubmit = (values: Pick<Post, "content">) =>
		toast.promise(async () => createPost(values.content), {
			loading: "Crafting your post...💃",
			success: () => {
				document.dispatchEvent(escapeEvent)
				mutate("posts")
				return "Post created ⚡"
			},
			error: (error) => `An error occured: ${error.message}😢`,
		})

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
			<Textarea placeholder="How do you feel today?" {...register("content")} />
			{errors.content && (
				<span className="text-red-500 text-sm">{errors.content.message}</span>
			)}

			<Button type="submit">Submit</Button>
		</form>
	)
}
