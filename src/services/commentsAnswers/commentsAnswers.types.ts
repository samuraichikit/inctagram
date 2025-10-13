export type AddCommentArgs = {
  content: string
  postId: number
}

export type CommentData = {
  answerCount: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

type From = {
  avatars: Avatar[]
  id: number
  username: string
}

type Avatar = {}
