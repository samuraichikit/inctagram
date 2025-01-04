import {
  RequestPostSubscriptions,
  ResponseGetPricesPay,
} from '@/services/accountSubscriptions/accountSubsService.types'
import { baseApi } from '@/services/baseApi'

export const accountService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPricesPayment: builder.query<ResponseGetPricesPay, void>({
      query: () => ({ url: `/v1/subscriptions/cost-of-payment-subscriptions` }),
    }),
    postSubscriptions: builder.mutation<{ url: string }, RequestPostSubscriptions>({
      query: body => ({ body, method: 'POST', url: '/v1/subscriptions' }),
    }),
  }),
})

export const { useGetPricesPaymentQuery, usePostSubscriptionsMutation } = accountService
