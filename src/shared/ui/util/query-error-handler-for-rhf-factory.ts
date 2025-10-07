import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
	isJsonApiErrorDocument,
	JsonApiErrorDocument,
	parseJsonApiErrors
} from '~/shared/util/json-api-error'
import { MutationMeta } from '~/app/tanstackQuery/queryClientInstance'

export const queryErrorHandlerForRHFFactory = <T extends FieldValues>({
	setError
}: {
	setError?: UseFormSetError<T>
}) => {
	return (err: JsonApiErrorDocument) => {
		// 400 от сервера в JSON:API формате
		if (isJsonApiErrorDocument(err)) {
			const { fieldErrors, globalErrors } = parseJsonApiErrors(err)

			// полевые ошибки
			for (const [field, message] of Object.entries(fieldErrors)) {
				setError?.(field as Path<T>, { type: 'server', message })
			}

			// «глобальные» (без pointer)
			if (globalErrors.length > 0) {
				setError?.('root.server', {
					type: 'server',
					message: globalErrors.join('\n')
				})
			}
		}
	}
}

export const mutationGlobalErrorHandler = (
	error: Error,
	_: unknown,
	__: unknown,
	mutation: unknown
) => {
	// @ts-ignore
	const globalFlag = (mutation.meta as MutationMeta)?.globalErrorHandler
	// если в meta сказали "off" — ничего не делаем
	if (globalFlag === 'off') {
		return
	}

	if (isJsonApiErrorDocument(error)) {
		const { globalErrors } = parseJsonApiErrors(error)

		// «глобальные» (без pointer)
		if (globalErrors.length > 0) {
			toast(globalErrors.join('\n'))
		}
	}
}
