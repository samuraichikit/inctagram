import { ResponseGetPricesPay } from '@/services/accountSubscriptions/accountSubsService.types'
import { baseApi } from '@/services/baseApi'

export const accountService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPricesPayment: builder.query<ResponseGetPricesPay, void>({
      query: () => ({ url: `/v1/subscriptions/cost-of-payment-subscriptions` }),
    }),
    // updateProfile: builder.mutation<void, UpdateProfile>({
    //     query: body => ({ body, method: 'PUT', url: 'v1/users/profile' }),
    // }),
  }),
})

export const { useGetPricesPaymentQuery } = accountService
