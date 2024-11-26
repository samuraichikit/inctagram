export type GetProfileResponse = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export type GetProfileWithPostsResponse = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: string
  publicationsCount: number
  region: string
  userName: string
}

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type UpdateProfile = {
  aboutMe: string
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  lastName: string
  region: string
  userName: string
}

export type GetPublicProfileResponse = {
  aboutMe: null | string
  avatars: Avatar[]
  id: number
  userMetadata: UserMetadata
  userName: string
}

export type UserMetadata = {
  followers: number
  following: number
  publications: number
}
