import { BASE_URL, PAGE_SIZE_PUBLIC_POSTS } from '@/common/constants'

import { GetPublicPostsResponse } from './publicPosts.types'

export const publicPostsService = {
  async getPublicPosts(): Promise<GetPublicPostsResponse> {
    const res = await fetch(`${BASE_URL}v1/public-posts/all?pageSize=${PAGE_SIZE_PUBLIC_POSTS}`, {})
    const posts = await res.json()

    return posts
  },
}
