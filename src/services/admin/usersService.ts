import { gql } from '@apollo/client'

export const GET_USER = gql(`
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
`)
