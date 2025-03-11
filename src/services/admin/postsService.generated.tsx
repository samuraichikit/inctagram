import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from './types'
const defaultOptions = {} as const

export type GetPostsByUserQueryVariables = Types.Exact<{
  endCursorId?: Types.InputMaybe<Types.Scalars['Int']['input']>
  userId: Types.Scalars['Int']['input']
}>

export type GetPostsByUserQuery = {
  __typename?: 'Query'
  getPostsByUser: {
    __typename?: 'PostsByUserModel'
    items?: Array<{
      __typename?: 'ImagePost'
      createdAt?: any | null
      id?: null | number
      url?: null | string
    }> | null
    pagesCount: number
  }
}

export const GetPostsByUserDocument = gql`
  query GetPostsByUser($userId: Int!, $endCursorId: Int) {
    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
      pagesCount
      items {
        id
        createdAt
        url
      }
    }
  }
`

/**
 * __useGetPostsByUserQuery__
 *
 * To run a query within a React component, call `useGetPostsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      endCursorId: // value for 'endCursorId'
 *   },
 * });
 */
export function useGetPostsByUserQuery(
  baseOptions: ({ skip: boolean } | { skip?: boolean; variables: GetPostsByUserQueryVariables }) &
    Apollo.QueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(
    GetPostsByUserDocument,
    options
  )
}
export function useGetPostsByUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(
    GetPostsByUserDocument,
    options
  )
}
export function useGetPostsByUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(
    GetPostsByUserDocument,
    options
  )
}
export type GetPostsByUserQueryHookResult = ReturnType<typeof useGetPostsByUserQuery>
export type GetPostsByUserLazyQueryHookResult = ReturnType<typeof useGetPostsByUserLazyQuery>
export type GetPostsByUserSuspenseQueryHookResult = ReturnType<
  typeof useGetPostsByUserSuspenseQuery
>
export type GetPostsByUserQueryResult = Apollo.QueryResult<
  GetPostsByUserQuery,
  GetPostsByUserQueryVariables
>
