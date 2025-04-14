import { AuthErrorBoundary as AuthLayoutComponent } from "@/layouts/error-boundary"
import type { ComponentProps } from "@/types/components"

export default function AuthLayout({ children }: ComponentProps) {
	return <AuthLayoutComponent>{children}</AuthLayoutComponent>
}
