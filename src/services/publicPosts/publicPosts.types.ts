export type GetPublicPostsResponse = {
  items: PublicPostResponse[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type PublicPostResponse = {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: UserImage[]
  isLiked: boolean
  likesCount: number
  location: null | string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

export type Owner = {
  firstName: string
  lastName: string
}

export type UserImage = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
