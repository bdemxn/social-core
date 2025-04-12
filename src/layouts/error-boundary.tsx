"use client"

import { ErrorBoundary } from "react-error-boundary"

type FallbackErrorType = {
	error: Error
	resetErrorBoundary: () => void
}

type AuthLayoutProps = {
	children: React.ReactNode
}

function Fallback({ error, resetErrorBoundary }: FallbackErrorType) {
	resetErrorBoundary()

	return (
		<div className="flex flex-col justify-center">
			<span>Something went wrong</span>
			<pre>{error.message}</pre>
		</div>
	)
}

export function AuthErrorBoundary({ children }: AuthLayoutProps) {
	return (
		<ErrorBoundary FallbackComponent={Fallback}>
			<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
				<div className="w-full max-w-sm">{children}</div>
			</div>
		</ErrorBoundary>
	)
}
