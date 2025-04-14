import type { ComponentProps } from "@/types/components"

export default function FeedLayout({ children }: ComponentProps) {
	return <main className="mx-auto w-[800px]">{children}</main>
}
