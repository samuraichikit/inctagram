import { BASE_URL } from '@/common/constants'

import { GetPublicProfileResponse } from '../profile'
import { PublicUserResponse } from './publicUser.types'

export const publicUserService = {
  async getPublicProfile(id: string): Promise<GetPublicProfileResponse> {
    const res = await fetch(`${BASE_URL}v1/public-user/profile/${id}`)
    const publicProfile = await res.json()

    return publicProfile
  },
  async getTotalUsers(): Promise<PublicUserResponse> {
    const res = await fetch(`${BASE_URL}v1/public-user`)
    const totalUsers = await res.json()

    return totalUsers
  },
}
