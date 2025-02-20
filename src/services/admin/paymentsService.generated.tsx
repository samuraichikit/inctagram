import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from './types'
const defaultOptions = {} as const

export type GetPaymentsByUserQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  userId: Types.Scalars['Int']['input']
}>

export type GetPaymentsByUserQuery = {
  __typename?: 'Query'
  getPaymentsByUser: {
    __typename?: 'PaymentPaginationModel'
    items: Array<{
      __typename?: 'SubscriptionByPaymentModel'
      dateOfPayment?: any | null
      endDate?: any | null
      id: string
      paymentType?: Types.PaymentMethod | null
      price: number
      type: Types.SubscriptionType
    }>
    page: number
    pageSize: number
    pagesCount: number
    totalCount: number
  }
}

export const GetPaymentsByUserDocument = gql`
  query GetPaymentsByUser(
    $userId: Int!
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getPaymentsByUser(
      userId: $userId
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        dateOfPayment
        endDate
        price
        type
        paymentType
      }
    }
  }
`

/**
 * __useGetPaymentsByUserQuery__
 *
 * To run a query within a React component, call `useGetPaymentsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetPaymentsByUserQuery(
  baseOptions: (
    | { skip: boolean }
    | { skip?: boolean; variables: GetPaymentsByUserQueryVariables }
  ) &
    Apollo.QueryHookOptions<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(
    GetPaymentsByUserDocument,
    options
  )
}
export function useGetPaymentsByUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(
    GetPaymentsByUserDocument,
    options
  )
}
export function useGetPaymentsByUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(
    GetPaymentsByUserDocument,
    options
  )
}
export type GetPaymentsByUserQueryHookResult = ReturnType<typeof useGetPaymentsByUserQuery>
export type GetPaymentsByUserLazyQueryHookResult = ReturnType<typeof useGetPaymentsByUserLazyQuery>
export type GetPaymentsByUserSuspenseQueryHookResult = ReturnType<
  typeof useGetPaymentsByUserSuspenseQuery
>
export type GetPaymentsByUserQueryResult = Apollo.QueryResult<
  GetPaymentsByUserQuery,
  GetPaymentsByUserQueryVariables
>
