import { MutationCache, QueryClient } from '@tanstack/react-query'
import { mutationGlobalErrorHandler } from '~/shared/ui/util/query-error-handler-for-rhf-factory'

type MutationMeta = {
	globalErrorHandler?: 'on' | 'off'
}

declare module '@tanstack/react-query' {
	interface Register {
		mutationMeta: MutationMeta
	}
}

const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onError: mutationGlobalErrorHandler
	}),
	defaultOptions: {
		queries: {
			retry: 3,
			staleTime: Infinity,
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			gcTime: 5 * 60 * 1000
		}
	}
})

export { queryClient, type MutationMeta }
