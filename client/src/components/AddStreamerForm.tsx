import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { type IStreamer, type IStreamerCreate, streamingPlatforms, type TStreamingPlatform } from '../types/streamers.ts'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useQueryClient, useMutation, type QueryClient } from '@tanstack/react-query'
import { addStreamer } from '../services/streamers.ts'
import { type AxiosResponse } from 'axios'

const AddStreamerForm: React.FC = () => {
  const queryClient: QueryClient = useQueryClient()
  const [selectedStreamingPlatform, setSelectedStreamingPlatform] = useState<TStreamingPlatform>(streamingPlatforms[0])

  const { register, handleSubmit, reset } = useForm<IStreamerCreate>()
  const { mutate: addStreamerMutation } = useMutation({
    mutationFn: async (newStreamer: IStreamerCreate): Promise<AxiosResponse<IStreamer | null>> => await addStreamer(newStreamer),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['streamers'] })
    }
  })

  const onSubmit: SubmitHandler<IStreamerCreate> = data => {
    addStreamerMutation(data)
    reset()
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ padding: 2, borderRadius: 2, border: 1, display: 'flex', flexDirection: 'column' }}
    >
      <TextField
        required
        label="Name"
        sx={{ width: 1, marginBottom: 3 }}
        {...register('name', { required: true })}
      />
      <FormControl sx={{ width: 1, marginBottom: 3 }}>
        <InputLabel>Streaming platforms</InputLabel>
        <Select
          value={selectedStreamingPlatform}
          label="Streaming platforms"
          required
          {...register('streamingPlatform', {
            required: true,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
              setSelectedStreamingPlatform(event.target.value)
            }
          })}
        >
          {streamingPlatforms.map(platform => <MenuItem key={platform} value={platform}>{platform}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField
        label="Despription"
        multiline
        maxRows={5}
        required
        sx={{ width: 1, marginBottom: 3 }}
        {...register('description', { required: true })}
      />
      <Box sx={{ width: 1, display: 'flex', justifyContent: 'center' }}>
        <Button type='submit' variant="contained">Save</Button>
      </Box>
    </Box>
  )
}

export default AddStreamerForm
