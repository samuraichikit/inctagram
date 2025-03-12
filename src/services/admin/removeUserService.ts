import { gql } from '@apollo/client'

export const REMOVE_USER_FROM_SYSTEM = gql(`
mutation removeUser($userId: Int!) {
removeUser(userId: $userId)
}`)
