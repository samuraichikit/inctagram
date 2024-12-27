export type GetUserPosts = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: string
  userName: string
}

export type PostsByUserNameResponse = {
  items: PostItemResponse[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

interface Owner {
  firstName: string
  lastName: string
}

interface Image {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type PostUpdate = {
  description: string
  postId: number
}

export interface PostItemResponse {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}
