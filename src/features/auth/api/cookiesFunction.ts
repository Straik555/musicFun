import { CookiesConfig } from '~/shared/config/cookiesConfig'
import Cookies from 'js-cookie'

const setCookiesToken = (access: string, refresh: string) => {
	Cookies.set(CookiesConfig.REFRESH_TOKEN, refresh, {
		expires: 1,
		path: '/'
	})
	Cookies.set(CookiesConfig.ACCESS_TOKEN, access, {
		expires: 0.1,
		secure: true,
		path: '/'
		// httpOnly: true
	})
}

const deleteCookies = () => {
	Cookies.remove(CookiesConfig.REFRESH_TOKEN)
	Cookies.remove(CookiesConfig.ACCESS_TOKEN)
}

export { setCookiesToken, deleteCookies }
