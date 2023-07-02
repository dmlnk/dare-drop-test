import React from 'react'
import Streamers from './views/Streamers.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StreamerDetails from './views/StreamerDetails.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { routes } from './settings.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

const router = createBrowserRouter([
  {
    path: routes.main,
    element: <Streamers />
  },
  {
    path: routes.streamer,
    element: <StreamerDetails/>
  }
])
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
