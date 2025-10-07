import { createRoot } from 'react-dom/client'
import '../style/reset.css'
import '../style/index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient } from '~/app/tanstackQuery/queryClientInstance'
import { router } from '~/app/tanstackRoute/routerInstance'

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
		<ReactQueryDevtools initialIsOpen={true} />
	</QueryClientProvider>
)
