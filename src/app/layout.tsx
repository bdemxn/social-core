import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/global.css"
import { Toaster } from "sonner"

export const metadata: Metadata = {
	title: "Social Core",
}

type RootLayoutType = {
	children: React.ReactNode
}

const inter = Inter({
	subsets: ["latin"],
})

export default function RootLayout({ children }: Readonly<RootLayoutType>) {
	return (
		<html lang="en" className={inter.className}>
			<body>{children}<Toaster richColors/></body>
		</html>
	)
}
