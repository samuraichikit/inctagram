export type UsersProfiles = {
  items: UserProfile[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

type UserProfile = {
  avatars: Avatar[]
  createdAt: string
  firstName: string
  id: number
  lastName: string
  userName: string
}

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type GetUsersProfilesArgs = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
}
