import { axios } from './api.ts'
import {
  type IStreamer,
  type IStreamerCreate,
  type IStreamersListPaginated,
  type TVoteActions
} from '../types/streamers.ts'
import { type AxiosResponse } from 'axios'

export const getStreamer = async (streamerId: IStreamer['id']): Promise<AxiosResponse<IStreamer | null>> => {
  return await axios.get<IStreamer | null>(`/streamers/${streamerId}`)
}

export const getStreamers = async (page: number, size: number): Promise<AxiosResponse<IStreamersListPaginated>> => {
  return await axios.get('/streamers', { params: { page, size } })
}

export const addStreamer = async (streamer: IStreamerCreate): Promise<AxiosResponse<IStreamer | null>> => {
  return await axios.post('/streamers', streamer).then()
}

export const voteForStreamer = async (streamerId: IStreamer['id'], actionValue: TVoteActions): Promise<AxiosResponse<null>> => {
  return await axios.put(`/streamers/${streamerId}/vote`, { action: actionValue })
}
