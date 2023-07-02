import React, { useState } from 'react'
import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  TablePagination, Typography
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { type QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getStreamers, voteForStreamer } from '../services/streamers.ts'
import { EVoteActions, type IStreamer, type IStreamersListPaginated, type TVoteActions } from '../types/streamers.ts'
import { type NavigateFunction, useNavigate } from 'react-router-dom'
import { type AxiosResponse } from 'axios'

const StreamersList: React.FC = () => {
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)

  const queryClient: QueryClient = useQueryClient()
  const navigate: NavigateFunction = useNavigate()

  const { data: streamers, isLoading } = useQuery({
    queryKey: ['streamers', page, size],
    queryFn: async (): Promise<AxiosResponse<IStreamersListPaginated>> => await getStreamers(page, size),
    keepPreviousData: true
  })

  const { mutate: voteForStreamerMutation } = useMutation({
    mutationFn: async ({ id, action }): Promise<AxiosResponse<IStreamer | null>> => await voteForStreamer(id, action),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['streamers'] })
    }
  })

  const onVote = (id: IStreamer['id'], action: TVoteActions) => {
    voteForStreamerMutation({ id, action })
  }

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setSize(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ padding: 2, borderRadius: 2, border: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isLoading && <CircularProgress />}
      {!isLoading && streamers?.data.results.map((streamer) => (
        <Box key={streamer.id} sx={{ width: 1 }}>
          <ListItem
            secondaryAction={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label="upvote" onClick={() => { onVote(streamer.id, EVoteActions.upvote) }}>
                <ThumbUpIcon />
              </IconButton>
              <Typography>{streamer.votes}</Typography>
              <IconButton aria-label="downvote" onClick={() => { onVote(streamer.id, EVoteActions.downvote) }}>
                <ThumbDownIcon />
              </IconButton>
            </Box>
            }
          >
          <ListItemButton onClick={() => { navigate(`/${streamer.id}`) }}>
              <ListItemText
                primary={streamer.name}
                secondary={streamer.description}
              />
          </ListItemButton>
          </ListItem>
        </Box>
      ))}
      {!isLoading && <TablePagination component='div' count={streamers?.data.count || 0} page={page} rowsPerPage={size} onPageChange={handlePageChange} onRowsPerPageChange={handleSizeChange} />}
    </Box>
  )
}

export default StreamersList
