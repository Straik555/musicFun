import { FC, useEffect } from 'react'

const OAuthCallbackPage: FC = () => {
	useEffect(() => {
		const url = new URL(window.location.href)
		const code = url.searchParams.get('code')

		if (code && window.opener) {
			window.opener.postMessage({ code }, window.location.origin)
		}

		window.close()
	}, [])

	return (
		<>
			<h2> OAuth2 Callback page </h2>
		</>
	)
}

export default OAuthCallbackPage
