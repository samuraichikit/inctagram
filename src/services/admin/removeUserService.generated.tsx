import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from './types'
const defaultOptions = {} as const

export type RemoveUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
}>

export type RemoveUserMutation = { __typename?: 'Mutation'; removeUser: boolean }

export const RemoveUserDocument = gql`
  mutation removeUser($userId: Int!) {
    removeUser(userId: $userId)
  }
`
export type RemoveUserMutationFn = Apollo.MutationFunction<
  RemoveUserMutation,
  RemoveUserMutationVariables
>

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveUserMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(
    RemoveUserDocument,
    options
  )
}
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<
  RemoveUserMutation,
  RemoveUserMutationVariables
>
