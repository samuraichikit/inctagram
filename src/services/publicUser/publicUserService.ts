import { BASE_URL } from '@/common/constants'

import { PublicUserResponse } from './publicUser.types'

export const publicUserService = {
  async getTotalUsers(): Promise<PublicUserResponse> {
    const res = await fetch(`${BASE_URL}v1/public-user`)
    const totalUsers = await res.json()

    return totalUsers
  },
}
