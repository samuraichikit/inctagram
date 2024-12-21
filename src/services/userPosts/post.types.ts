export type PostUpdate = {
  description: string
  postId: number
}

interface PostItem {
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

export type GetPostByIdResponse = PostItem

export interface Image {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export interface Owner {
  firstName: string
  lastName: string
}
