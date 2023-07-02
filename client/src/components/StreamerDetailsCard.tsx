import React from 'react'
import { Box, Typography } from '@mui/material'
import { type IStreamer } from '../types/streamers.ts'

interface StreamerDetailsCardProps {
  streamer: IStreamer
}

const StreamerDetailsCard: React.FC<StreamerDetailsCardProps> = ({ streamer }) => {
  return (
    <Box sx={{ padding: 2, borderRadius: 2, border: 1, display: 'flex', alignItems: 'center', minWidth: 500, minHeight: 200 }}>
      <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png" alt="" width={160} height={160} />
      <Box sx={{ padding: 2, width: 1, display: 'flex', flexDirection: 'column' }}>
        <Box mb={2}>
          <Typography fontWeight={'bold'}>Name</Typography>
          <Typography>{streamer.name}</Typography>
        </Box>
        <Box mb={2}>
          <Typography fontWeight={'bold'}>Streaming platform</Typography>
          <Typography>{streamer.streamingPlatform}</Typography>
        </Box>
        <Box>
          <Typography fontWeight={'bold'}>Description</Typography>
          <Typography>{streamer.description}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default StreamerDetailsCard
