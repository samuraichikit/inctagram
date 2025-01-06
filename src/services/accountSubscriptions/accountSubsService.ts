import {
  RequestPostSubscriptions,
  ResponseCurrPaymentSubs,
  ResponseGetPricesPay,
  myPaymentType,
} from '@/services/accountSubscriptions/accountSubsService.types'
import { baseApi } from '@/services/baseApi'

export const accountService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentPaymentSubscriptions: builder.query<ResponseCurrPaymentSubs, void>({
      query: () => ({ url: `/v1/subscriptions/current-payment-subscriptions` }),
    }),
    getMyPayments: builder.query<myPaymentType[], void>({
      query: () => ({ url: `/v1/subscriptions/my-payments/` }),
    }),
    getPricesPayment: builder.query<ResponseGetPricesPay, void>({
      query: () => ({ url: `/v1/subscriptions/cost-of-payment-subscriptions` }),
    }),
    postCanceledAutoRenewal: builder.mutation<void, void>({
      query: () => ({ method: 'POST', url: '/v1/subscriptions/canceled-auto-renewal' }),
    }),
    postSubscriptions: builder.mutation<{ url: string }, RequestPostSubscriptions>({
      query: body => ({ body, method: 'POST', url: '/v1/subscriptions' }),
    }),
  }),
})

export const {
  useGetCurrentPaymentSubscriptionsQuery,
  useGetMyPaymentsQuery,
  useGetPricesPaymentQuery,
  usePostCanceledAutoRenewalMutation,
  usePostSubscriptionsMutation,
} = accountService
