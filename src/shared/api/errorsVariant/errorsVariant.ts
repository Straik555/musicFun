import { toast } from 'react-toastify'
import ToastMessageConfig from '~/shared/config/toastMessageConfig'
import { JsonApiErrorDocument } from '~/shared/util/json-api-error'

export const onError = (error: JsonApiErrorDocument) => {
	if (error.errors.length) {
		toast.error(
			error.errors[0].detail
				? error.errors[0].detail.charAt(0).toUpperCase() +
						error.errors[0].detail.slice(1, 53)
				: ToastMessageConfig.ERROR
		)
	} else {
		toast.error(ToastMessageConfig.ERROR)
	}
}
