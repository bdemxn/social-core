"use client"

import { createPost, getAllPosts } from "@/actions/posts-actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { SunMoonIcon } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import useSWR, { mutate } from "swr"
import type { auth } from "@/lib/auth"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/dark-mode"

type Post = {
  id: string
  user: Pick<typeof auth.$Infer.Session.user, "id" | "name" | "username" | "displayUsername"> | null
  content: string
  createdAt: Date
}

const PostSchema = z.object({
  content: z.string().min(1, "Post must be 1 character at least").max(200),
})

export default function Feed() {
  const router = useRouter()
  const { data, isLoading } = useSWR("posts", getAllPosts)
  const { data: userData } = authClient.useSession()

  function getInitialForUsers(): string {
    const fullname = userData?.user.name
    if (!fullname) return ":)"

    const initials = fullname?.split(" ")
    return initials[0][0] + initials[1][0]
  }

  return (
    <>
      <div className="backdrop-blur-md sticky top-0 p-2 flex justify-between items-center gap-x-3">
        <span className="font-semibold">Feed</span>

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
                  <span className="text-neutral-400">@{userData?.user.username}</span>
                </div>

                <Button variant="secondary" onClick={() => router.push(`/profile/${userData?.user.id}`)} size="sm">Go to profile</Button>
              </div>
            </PopoverContent>
          </Popover>
          <ModeToggle />
        </div>
      </div>

      <div className="mt-10 space-y-3">
        {
          isLoading ? <div>Loading posts...</div> : data?.map((post) => (
            <FeedPostCard content={post.content} createdAt={post.createdAt} user={post.user} id={post.id} key={post.id} />
          ))
        }
      </div>
    </>
  )
}

function FeedPostCard({ user, createdAt, content }: Post) {
  return (
    <div className="w-full border border-neutral-200 p-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-1">
          <Link className="text-blue-500 font-semibold" href={`/profile/${user?.id}`}>{user?.name}</Link>
          <span className="text-xs text-neutral-400">@{user?.username}</span>
        </div>

        <span className="text-sm">{createdAt.toLocaleString()}</span>
      </div>

      <p>{content}</p>
    </div>
  )
}

function CreatePost() {
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

function PostForm() {
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
    bubbles: true
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
