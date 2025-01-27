import { BASE_URL } from '@/common/constants'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${BASE_URL}v1/graphql`,
})
