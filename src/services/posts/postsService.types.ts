export type GetUserPostsArgs = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: string
  userName: string
}

export type GetUserPostsByUserIdArgs = { userId: string } & Omit<GetUserPostsArgs, 'userName'>

export type PostsByUserNameResponse = {
  items: PostResponse[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type PostsByUserIdResponse = { totalUsers: number } & Omit<
  PostsByUserNameResponse,
  'notReadCount'
>

export type PostResponse = {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: null | string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

type Owner = {
  firstName: string
  lastName: string
}

type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
