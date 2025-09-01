export type CreateCommentRequest = {
  content: string
  postId: number
}
export type CreateAnswerToCommentRequest = {
  commentId: number
} & CreateCommentRequest

export type CommentsViewModel = {
  answerCount: number
  content: string
  createdAt: string
  from: {
    avatars: Array<any>
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}
export type AnswersViewModel = {
  commentId: number
  content: string
  createdAt: string
  from: {
    avatars: Array<any>
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
}

export type GetPostCommentsArg = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: string
}
export type GetPostCommentsRequest = {
  postId: number
} & GetPostCommentsArg

export type GetAnswersToPostCommentRequest = { commentId: number } & GetPostCommentsRequest

export type GetPostCommentsResponse = {
  items: Array<CommentsViewModel>
  pageSize: number
  totalCount: number
}
export type GetAnswersToPostCommentsResponse = {
  items: Array<AnswersViewModel>
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type GetCommentLikesResponse = {
  items: Array<UserFollowingFollowersViewModel>
  pageSize: number
  totalCount: number
}

export type UserFollowingFollowersViewModel = {
  avatars: Image[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type GetCommentLikesArg = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
}
export type GetCommentLikesRequest = {
  commentId: number
  postId: number
} & GetCommentLikesArg

export type GetAnswerCommentLikesRequest = { answerId: number } & GetCommentLikesRequest

export type UpdateLikeStatusRequest = {
  commentId: number
  likeStatus: string
  postId: number
}

export type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type UpdateAnswerLikeStatusRequest = { answerId: number } & UpdateLikeStatusRequest
