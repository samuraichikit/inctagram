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

export const GET_FOLLOWERS = gql(`
  query GetFollowers($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {
    getFollowers(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
      pagesCount,
      page,
      totalCount,
      pageSize,
      items {
        id,
        userId,
        userName,
        createdAt
      }
      }
    } 
`)
