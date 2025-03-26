import { ADMIN_ENCODED_CREDENTIALS, BASE_URL } from '@/common/constants'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Basic ${ADMIN_ENCODED_CREDENTIALS}`,
  },
  uri: `${BASE_URL}v1/graphql`,
})
