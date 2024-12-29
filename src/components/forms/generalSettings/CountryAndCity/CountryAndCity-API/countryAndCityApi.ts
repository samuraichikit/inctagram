import { cityType, countryType } from '@/components/forms/generalSettings/GeneralSettings.types'
import { GetProfileResponse } from '@/services/profile'
import axios from 'axios'

export const countryAndCityApi = {
  getCities(selectedValue: null | string, profile: GetProfileResponse | undefined) {
    return axios
      .get(`https://www.universal-tutorial.com/api/states/${selectedValue || profile?.country}`, {
        headers: {
          Accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuZXZhemhub2FsaWtoYW5AZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiQ2dqRDlObVZCbmh3M2VuNXNaSmFVRkJEdmdHOVdsNzh4T1VjXzcyazY5aFgxYk9zb21mVFppYWRtRkVLTVdraFp5MCJ9LCJleHAiOjE3MzU1NDQyODZ9.F-qf2wxJUkFIcXa9ToIpb58XdO07Q-47afed5zWIc1Q',
        },
      })
      .then(res => {
        const data: cityType[] = [{ state_name: profile?.city || 'city' }, ...res.data]

        return data
      })
  },

  getCountries(profile: GetProfileResponse) {
    return axios
      .get('https://www.universal-tutorial.com/api/countries/', {
        headers: {
          Accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuZXZhemhub2FsaWtoYW5AZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiQ2dqRDlObVZCbmh3M2VuNXNaSmFVRkJEdmdHOVdsNzh4T1VjXzcyazY5aFgxYk9zb21mVFppYWRtRkVLTVdraFp5MCJ9LCJleHAiOjE3MzU1NDQyODZ9.F-qf2wxJUkFIcXa9ToIpb58XdO07Q-47afed5zWIc1Q',
        },
      })
      .then(res => {
        const data: countryType[] = [
          {
            country_name: profile?.country || 'country',
            country_phone_code: 1,
            country_short_name: profile?.country || 'country',
          },
          ...res.data,
        ]

        return data
      })
  },
}
