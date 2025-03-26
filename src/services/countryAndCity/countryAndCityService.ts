import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ResponseCity, ResponseCountry } from './countryAndCityService.types'

export const countryAndCity = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_COUNTRY_AND_CITY_BASE_URL,
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_COUNTRY_AND_CITY_TOKEN}`)

      return headers
    },
  }),

  endpoints: build => ({
    getCountry: build.query<ResponseCountry[], void>({
      query: () => 'countries',
    }),
    getRegions: build.query<ResponseCity, number>({
      query: parentId => `child-regions?parentId=${parentId}`,
    }),
  }),
  reducerPath: 'CountryAndCity',
})

export const { useGetCountryQuery, useGetRegionsQuery } = countryAndCity
