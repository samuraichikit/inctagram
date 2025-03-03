import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from './types'
const defaultOptions = {} as const

export type GetUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
}>

export type GetUserQuery = {
  __typename?: 'Query'
  getUser: {
    __typename?: 'User'
    profile: {
      __typename?: 'Profile'
      avatars?: Array<{ __typename?: 'Avatar'; url?: null | string }> | null
      createdAt: any
      firstName?: null | string
      id: number
      lastName?: null | string
      userName?: null | string
    }
  }
}

export type GetFollowersQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  userId: Types.Scalars['Int']['input']
}>

export type GetFollowersQuery = {
  __typename?: 'Query'
  getFollowers: {
    __typename?: 'FollowPaginationModel'
    items: Array<{
      __typename?: 'Follow'
      createdAt: any
      id: number
      userId: number
      userName?: null | string
    }>
    page: number
    pageSize: number
    pagesCount: number
    totalCount: number
  }
}

export const GetUserDocument = gql`
  query GetUser($userId: Int!) {
    getUser(userId: $userId) {
      profile {
        id
        avatars {
          url
        }
        userName
        firstName
        lastName
        createdAt
      }
    }
  }
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: ({ skip: boolean } | { skip?: boolean; variables: GetUserQueryVariables }) &
    Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export function useGetUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>
export const GetFollowersDocument = gql`
  query GetFollowers(
    $userId: Int!
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getFollowers(
      userId: $userId
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      pagesCount
      page
      totalCount
      pageSize
      items {
        id
        userId
        userName
        createdAt
      }
    }
  }
`

/**
 * __useGetFollowersQuery__
 *
 * To run a query within a React component, call `useGetFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetFollowersQuery(
  baseOptions: ({ skip: boolean } | { skip?: boolean; variables: GetFollowersQueryVariables }) &
    Apollo.QueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetFollowersQuery, GetFollowersQueryVariables>(
    GetFollowersDocument,
    options
  )
}
export function useGetFollowersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetFollowersQuery, GetFollowersQueryVariables>(
    GetFollowersDocument,
    options
  )
}
export function useGetFollowersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetFollowersQuery, GetFollowersQueryVariables>(
    GetFollowersDocument,
    options
  )
}
export type GetFollowersQueryHookResult = ReturnType<typeof useGetFollowersQuery>
export type GetFollowersLazyQueryHookResult = ReturnType<typeof useGetFollowersLazyQuery>
export type GetFollowersSuspenseQueryHookResult = ReturnType<typeof useGetFollowersSuspenseQuery>
export type GetFollowersQueryResult = Apollo.QueryResult<
  GetFollowersQuery,
  GetFollowersQueryVariables
>
