import { Inter } from "next/font/google"
import { ThemeProvider } from "@/layouts/theme-provider"
import { Toaster } from "sonner"
import type { Metadata } from "next"
import type { ComponentProps } from "@/types/components"
import "@/styles/global.css"

export const metadata: Metadata = {
	title: "Social Core",
}

const inter = Inter({
	subsets: ["latin"],
})

export default function RootLayout({ children }: Readonly<ComponentProps>) {
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
