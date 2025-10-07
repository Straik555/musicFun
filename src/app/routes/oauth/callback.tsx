import { createFileRoute } from '@tanstack/react-router'
import { OAuthCallbackPage } from '~pages'

export const Route = createFileRoute('/oauth/callback')({
	component: OAuthCallbackPage
})
