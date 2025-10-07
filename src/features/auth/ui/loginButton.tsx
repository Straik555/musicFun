import { FC } from 'react'
import {
	callbackUrl,
	useLoginMutation
} from '~/features/auth/api/useLoginMutation'
import { baseUrl } from '~/shared/api/client'

const LoginButton: FC = () => {
	const mutation = useLoginMutation()

	const handleLoginClick = () => {
		window.addEventListener('message', handleOauthMessage)
		window.open(
			`${baseUrl}auth/oauth-redirect?callbackUrl=${callbackUrl}`,
			'apihub-oauth2',
			'width=500,height=600'
		)
	}

	const handleOauthMessage = (event: MessageEvent) => {
		window.removeEventListener('message', handleOauthMessage)
		if (event.origin !== document.location.origin) {
			console.warn('origin not match')
			return
		}
		const code = event.data.code

		if (!code) {
			console.warn('no code in message')
			return
		}
		mutation.mutate({ code })
	}

	return (
		<>
			<button onClick={handleLoginClick}>Log in API_ HUB</button>
		</>
	)
}

export default LoginButton
