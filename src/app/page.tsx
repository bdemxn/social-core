"use client"

import { getAllPosts } from "@/actions/posts-actions"
import { accountRegistered } from "@/actions/profile-actions"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import GitHubIcon from "@/components/icons/github-icon"
import Navbar from "@/components/app/navbar"
import LinkedInIcon from "@/components/icons/linkedin-icon"
import Link from "next/link"
import useSWR from "swr"
import { GeistSans } from 'geist/font/sans'
import TursoIcon from "@/components/icons/turso-icon"
import BetterAuthIcon from "@/components/icons/better-auth-icon"
import NextjsIcon from "@/components/icons/nextjs-icon"
import TypeScriptIcon from "@/components/icons/typescript-icon"
import DrizzleORMIcon from "@/components/icons/drizzle-icon"
import ZodIcon from "@/components/icons/zod-icon"

export default function Home() {
	const router = useRouter()
	const { data: profilesCreated } = useSWR("users", accountRegistered)
	const { data: postsCreated } = useSWR("allPosts", getAllPosts)

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<Navbar />

				<section className="md:mx-auto mx-5 md:w-[800px] mt-[5rem]">

					<section>
						<h1 className="text-3xl font-semibold text-pretty">Discover a Minimalist, Distraction-Free Social Network✨</h1>
						<h2 className="text-neutral-500 text-wrap">Clean design. No clutter. Real connections.</h2>

						<Button className="mx-auto mt-[1rem]" onClick={() => router.push("/register")}>Join Now</Button>
					</section>

					<section className="mt-[5rem]">
						<h2 className="text-xl font-semibold text-pretty">Say Hello World or Anything Else💃</h2>

						<div>
							<h3 className="text-neutral-500 text-wrap">Connect with <b>{profilesCreated?.length} users</b> around the world. And interact with more than <b>{postsCreated?.length} posts🔥</b></h3>
						</div>
					</section>

					<div className="mt-[5rem]">
						<h2 className="text-xl font-semibold text-pretty">Crafted with powerful tools⚡</h2>
						<h3 className="text-neutral-500 text-wrap">Big ideas need big technologies with high performance</h3>
						<div className="flex items-center justify-between gap-x-4 mt-4">
							{
								iconList.map(({ name, icon: Icon }) => (
									<Icon key={name} className="size-10"/>
								))
							}
						</div>
					</div>
				</section>
			</main>

			<footer className="">

				<div className="md:w-[800px] mx-5 md:mx-auto mt-[10rem] py-10 md:py-1 flex gap-x-2 items-center justify-between">
					<p className={`${GeistSans.className} text-sm`}>Made by Kevin Bonilla</p>

					<div className="flex gap-x-2">
						{
							footerLinks.map(({ href, icon: Icon }) => (
								<Link href={href} key={href}><Icon className="size-5" /></Link>
							))
						}
					</div>
				</div>
			</footer>
		</div>
	)
}

const footerLinks = [
	{
		href: "https://www.linkedin.com/in/kb1909zzz/",
		icon: LinkedInIcon
	},
	{
		href: "https://github.com/bdemxn",
		icon: GitHubIcon
	}
]

const iconList = [
	{
		name: "TypeScript",
		icon: TypeScriptIcon
	},
	{
		name: "Next.js",
		icon: NextjsIcon
	},
	{
		name: "Better-Auth",
		icon: BetterAuthIcon
	},
	{
		name: "Turso",
		icon: TursoIcon
	},
	{
		name: "DrizzleORM",
		icon: DrizzleORMIcon
	},
	{
		name: "Zod",
		icon: ZodIcon
	},
]