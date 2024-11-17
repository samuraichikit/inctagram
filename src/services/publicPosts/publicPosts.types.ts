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

export type CommentsResponse = {
  items: Comment[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type From = {
  avatars: Avatar[]
  id: number
  username: string
}

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
