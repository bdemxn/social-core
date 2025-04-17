import type { ComponentProps } from "@/types/components"

export default function ProfileLayout({ children }: ComponentProps) {
	return <main className="mx-2 md:mx-auto md:w-[800px]">{children}</main>
}
