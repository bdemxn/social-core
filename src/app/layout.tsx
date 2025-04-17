import { ThemeProvider } from "@/layouts/theme-provider"
import type { ComponentProps } from "@/types/components"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "@/styles/global.css"

export const metadata: Metadata = {
	title: "Social Core — Minimalist Social Network",
	description:
		"Connect, share and discover in a clean, distraction-free environment.",
	keywords: [
		"social network",
		"minimalist social media",
		"connect",
		"discover",
		"Social Core",
	],
	metadataBase: new URL("https://socialcore.vercel.app"),
	openGraph: {
		title: "Social Core — Minimalist Social Network",
		description:
			"Connect, share and discover in a clean, distraction-free environment.",
		url: "https://socialcore.vercel.app",
		siteName: "Social Core",
		images: [
			{
				url: "https://socialcore.vercel.app/og-image.png",
				width: 1200,
				height: 630,
				alt: "SocialCore preview",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Social Core — Minimalist Social Network",
		description:
			"Connect, share and discover in a clean, distraction-free environment.",
		images: ["https://socialcore.vercel.app/og-image.png"],
	},
	authors: [{ name: "Kevin Bonilla" }],
	creator: "Kevin Bonilla",
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
