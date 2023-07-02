import React from 'react'
import StreamerDetailsCard from '../components/StreamerDetailsCard.tsx'
import { Box, CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router-dom'
import { getStreamer } from '../services/streamers.ts'

const StreamerDetails: React.FC = () => {
  const { streamerId } = useParams<{
    streamerId: string
  }>()
  const { data: streamerData, isLoading, isError } = useQuery({
    queryKey: [streamerId],
    queryFn: async () => await getStreamer(streamerId)
  })

  return (
    !isError
      ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        {isLoading && <CircularProgress />}
        {!isLoading && (streamerData.data != null) && <StreamerDetailsCard streamer={streamerData?.data} />}
      </Box>)
      : <Navigate to='/' replace={true}/>
  )
}

export default StreamerDetails
