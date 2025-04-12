import { AuthErrorBoundary as AuthLayoutComponent } from "@/layouts/error-boundary"

type AuthLayoutProps = {
	children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return <AuthLayoutComponent>{children}</AuthLayoutComponent>
}
