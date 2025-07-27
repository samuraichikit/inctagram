export type GetFollowersPublicationsArgs = {
  endCursorPostId?: number
  pageNumber?: number
  pageSize?: number
}

export type GetFollowersPublications = {
  items: Post[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

type Post = {
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
