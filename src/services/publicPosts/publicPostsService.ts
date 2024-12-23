import { BASE_URL, PAGE_SIZE_PUBLIC_POSTS } from '@/common/constants'

import { CommentsResponse, GetPublicPostsResponse, PublicPostResponse } from './publicPosts.types'

export const publicPostsService = {
  async getComments(postId: string): Promise<CommentsResponse> {
    const res = await fetch(`${BASE_URL}v1/public-posts/${postId}/comments`)
    const comments = await res.json()

    return comments
  },
  async getPublicPost(postId: string): Promise<PublicPostResponse> {
    const res = await fetch(`${BASE_URL}v1/public-posts/${postId}`)
    const post = await res.json()

    return post
  },
  async getPublicPosts(): Promise<GetPublicPostsResponse> {
    const res = await fetch(`${BASE_URL}v1/public-posts/all?pageSize=${PAGE_SIZE_PUBLIC_POSTS}`, {})
    const posts = await res.json()

    return posts
  },
  async getPublicPostsByUserId(userId: string): Promise<GetPublicPostsResponse> {
    const res = await fetch(`${BASE_URL}v1/public-posts/user/${userId}?pageSize=8`)
    const userPosts = await res.json()

    return userPosts
  },
}
