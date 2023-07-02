export const streamingPlatforms: string[] = ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble']

export type TStreamingPlatform = typeof streamingPlatforms[number]
export interface IStreamer {
  id: string
  name: string
  streamingPlatform: TStreamingPlatform
  description: string
  votes: number
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

export interface IStreamerCreate {
  name: string
  streamingPlatform: TStreamingPlatform
  description: string
}

export interface IStreamersListPaginated {
  count: number
  pages: number
  results: IStreamer[]
}

export enum EVoteActions {
  upvote = 'upvote',
  downvote = 'downvote',
}

export type TVoteActions = EVoteActions.upvote | EVoteActions.downvote
