export type GetUserPosts = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: string
  userName: string
}

export type PostsByUserNameResponse = {
  items: PostResponse[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type PostResponse = {
  avatarOwner: string
  avatarWhoLikes: boolean
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
