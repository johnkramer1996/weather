import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { queryClient } from '@/api/query-client'

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export { Providers }
