type FeedLayoutProps = {
	children: React.ReactNode
}

export default function FeedLayout({ children }: FeedLayoutProps) {
	return <main className="mx-auto w-[800px]">{children}</main>
}
