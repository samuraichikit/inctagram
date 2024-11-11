import { BASE_URL } from '@/common/constants'

import { PublicUserResponse } from './publicUser.types'

export const publicUserService = {
  async getTotalUsers() {
    const res = await fetch(`${BASE_URL}v1/public-user`)
    const totalUsers: PublicUserResponse = await res.json()

    return totalUsers
  },
}
