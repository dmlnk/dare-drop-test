import Axios from 'axios'
import { toast } from 'react-toastify'

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
})

axios.interceptors.response.use((response) => response, async (error) => {
  if (!error.response) {
    toast.error('Network error.', {
      toastId: 'networkError'
    })
    throw new Error('Network error.')
  }

  if (error.response.status === 404) {
    toast.error('Requested resource is not available.', {
      toastId: 'notAvailable'
    })
    throw new Error('Requested resource is not available.')
  }

  if (error.response.status === 500) {
    toast.error('Unexpected error occurred.', {
      toastId: 'unknownError'
    })
    throw new Error('Unexpected error occurred.')
  }
  return await Promise.reject(error)
})
