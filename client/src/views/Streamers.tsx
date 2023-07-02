import React from 'react'
import { Box, Typography } from '@mui/material'
import AddStreamerForm from '../components/AddStreamerForm.tsx'
import StreamersList from '../components/StreamersList.tsx'

const Streamers: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '30%', padding: 2 }}>
        <Typography variant="h3">Add streamer</Typography>
        <AddStreamerForm/>
      </Box>
      <Box sx={{ width: '70%', padding: 2 }}>
        <Typography variant="h3">Streamers</Typography>
        <StreamersList/>
      </Box>
    </Box>
  )
}

export default Streamers
