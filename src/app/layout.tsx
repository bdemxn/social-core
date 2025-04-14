import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/global.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/layouts/theme-provider"

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
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster richColors />
				</ThemeProvider>
			</body>
		</html>
	)
}
